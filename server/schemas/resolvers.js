const { Client, Employee, WorkOrder } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.employee) {
        const employeeData = await Employee.findOne({ _id: context.employee._id })
          .select("-__v -password")
          .populate("timeCards");

        return employeeData;
      }

      throw new AuthenticationError("Not logged in");
    },
    // workOrders: async () => {
    //   return Client.find();
    // },
    // workOrder: async (parent, { _id }) => {
    //   return Client.findOne({ _id })
    // },
    // get all clients
    clients: async () => {
      return Client.find().populate("workOrders");
    },

    // get single client
    client: async (parent, { _id }) => {
      return Client.findOne({ _id }).populate("workOrders");
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
      }

      // throw new AuthenticationError('You need to be logged in!');
};

module.exports = resolvers;
