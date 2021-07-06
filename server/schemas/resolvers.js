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
      return Employee.find().select("-__v").populate("timeCards");
    },

    // get single employee
    employee: async (parent, { _id }) => {
      return Employee.findOne({ _id })
        .select("-__v -password")
        .populate("timeCards");
    },

    //resolver function for workOrders -> get all workorders
    workOrders: async () => {
      return WorkOrder.find()
    },

    //find workOrder by id
    workOrder: async(parent, { _id }) => {
        return WorkOrder.findOne({ _id })
    }
  },
  Mutation: {
    addEmployee: async (parent, args) => {
      const employee = await Employee.create(args);
      //const token = signToken(employee);

      return employee;
    },

    login: async(parent, { email, password }) => {
      const user = await Employee.findOne({ email });
      //TODO: remove pointers to incorrect option
      if (!user){
        throw new AuthenticationError('Incorrect Credentials -> Email');
      }

      const correctPw = await user.isCorrectPassword(password);

      if(!correctPw) {
        throw new AuthenticationError('Incorrect Credentials  -> PW');
      }

      const token = signToken(user);

      return { token, user };
    },
    
    clockIn: async(parent, { timestamp, status }, context) => {
      console.log(context.employee);

      if (context.employee) {
        console.log('timestamp', timestamp);
        console.log('choice', status);
        
        const updatedUser = await Employee.findOneAndUpdate(
          { _id: context.employee._id },
          { $push: { timeCards: { timestamp, status } } },
          { new: true }
        ).populate('timeCards')

        return updatedUser;
      }
      throw new AuthenticationError('You must log in first');

    },

    clockOut: async(parent, { timestamp, status }, context) => {
      console.log(context.employee);

      if (context.employee) {
        console.log('timestamp', timestamp);
        console.log('choice', status);
        
        const updatedUser = await Employee.findOneAndUpdate(
          { _id: context.employee._id },
          { $push: { timeCards: { timestamp, status } } },
          { new: true }
        ).populate('timeCards')

        return updatedUser;
      }
      throw new AuthenticationError('You must log in first');

    },

    
    // addClient: async (parent, args) => {
    //     const client = await Client.create(args);

    //     return client;
    //   },

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
