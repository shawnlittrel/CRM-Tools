const { Client, Employee, WorkOrder } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")(
  "sk_test_51J9IXHF9OL10HIOg6r2H0mwKo4ZrYMnJv65Oqc9UU9XXgPWxaQ3Fb7Th2k0M3Ewvadvt9QEwTMoFlWcmI4jhUD5M00cAiiuIYB"
);

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.employee) {
        const employeeData = await Employee.findOne({
          _id: context.employee._id,
        })
          .select("-__v -password")
          .populate("timeCards");

        return employeeData;
      }

      throw new AuthenticationError("Not logged in");
    },
    // get all clients
    clients: async () => {
      return Client.find().populate("WorkOrders");
    },

    // get single client
    client: async (parent, { _id }) => {
      return Client.findOne({ _id }).populate("WorkOrders");
    },

    // get all employees
    employees: async () => {
      return Employee.find().select("-__v -password").populate("timeCards");
    },

    // get single employee
    employee: async (parent, { _id }) => {
      return Employee.findOne({ _id })
        .select("-__v -password")
        .populate("timeCards");
    },

    payment: async (parents, args, context) => {
      const url = new URL(context.header.referer).origin;
      const order = new WorkOrder({ workOrderInvoice: args.workOrderInvoice });
      const { workOrderInvoice } = await order
        .populate("workOrderInvoice")
        .execPopulate();
      const lineItems = [];

      for (let i = 0; i < workOrderInvoice.length; i++) {
        const workOrder = await stripe.workOrderInvoic.create({
          //    billabletime:workOrderInvoice.billabletime,
          parts: workOrderInvoice[i].parts,
        });
        const price = await stripe.prices.create({
          part: part.id,
          unit_amount: parts[i].partPrice * 100,
          currency: "usd",
        });
        lineItems.push({
          price: price.id,
          quantity: 1,
        });
      }
      stripe = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url:
          `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/cancel`,
      });
      return{session:session.id}
    },

    // resolver function for workOrders
    // workorders: async (parent, { _id }) => {
    //   const params = _id ? { _id } : {};
    //   return WorkOrder.findOne({ _id });
    // },
  },
  Mutation: {
    addEmployee: async (parent, args) => {
      const employee = await Employee.create(args);
      const token = signToken(employee);

      return { token, employee };
    },
    // addClient: async (parent, args) => {
    //     const client = await Client.create(args);

    //     return client;
    //   },
    // login: async (parent, { email, password }) => {
    //   const employee = await Employee.findOne({ email });

    //   if (!employee) {
    //     throw new AuthenticationError("Incorrect email and/or password");
    //   }

    //   const correctPw = await employee.isCorrectPassword(password);

    //   if (!correctPw) {
    //     throw new AuthenticationError("Incorrect email and/or password");
    //   }

    //   const token = signToken(employee);
    //   return { token, employee };
    // },
    // TODO this would only be available to logged in employees?
    // TODO Would this just be used to push a new workorder to client? so confused
    // addWorkOrder: async (parent, { clientId, workOrderDate, workOrderDescription, workOrderNotes, workOrderParts, workOrderInvoice, workOrderbillableTime }, context) => {
    //   if (context.client) {
    //     const updatedWorkOrder = await WorkOrder.findOneAndUpdate(
    //       { _id: clientId },
    //       { $addToSet: { workOrders: { workOrderDate, workOrderDescription, workOrderNotes, workOrderParts, workOrderInvoice, BillableTime }}},
    //       { new: true, runValidators: true }
    //     );

    //     return updatedWorkOrder;

    // await Client.findByIdAndUpdate(
    //   { _id: context.client._id },
    //   { $push: { workOrders: workOrder._id } },
    //   { new: true }
    // );

    // return workOrder;
  },

  // throw new AuthenticationError('You need to be logged in!');
};

module.exports = resolvers;
