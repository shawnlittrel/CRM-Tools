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
          _id: context.employee._id
        })
          .select("-__v -password")
          .populate("timeCards");

        return employeeData;
      }

      throw new AuthenticationError("Not logged in");
    },
    // get all clients
    clients: async () => {
      return Client.find()
        .select("-__typename")
        .populate("WorkOrders");
    },

    // get single client
    client: async (parent, { _id }) => {
      return Client.findOne({ _id }).populate("WorkOrders");
    },

    // get all employees
    employees: async () => {
      return Employee.find()
        .select("-__v")
        .populate("timeCards");
    },

    // get single employee
    employee: async (parent, { _id }) => {
      return Employee.findOne({ _id })
        .select("-__v -password")
        .populate("timeCards");
    },

    workOrders: async () => {
      return WorkOrder.find();
    },

    //find workOrder by id
    workOrder: async (parent, { _id }) => {
      return WorkOrder.findOne({ _id });
    }
  },
  Mutation: {
    addEmployee: async (parent, args) => {
      const employee = await Employee.create(args);
      //const token = signToken(employee);

      return employee;
    },

    login: async (parent, { email, password }) => {
      const user = await Employee.findOne({ email });
      //TODO: remove pointers to incorrect option
      if (!user) {
        throw new AuthenticationError("Incorrect Credentials -> Email");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect Credentials  -> PW");
      }

      const token = signToken(user);

      return { token, user };
    },

    clockIn: async (parent, { timestamp, status }, context) => {
      console.log(context.employee);

      if (context.employee) {
        console.log("timestamp", timestamp);
        console.log("choice", status);

        const updatedUser = await Employee.findOneAndUpdate(
          { _id: context.employee._id },
          { $push: { timeCards: { timestamp, status } } },
          { new: true }
        ).populate("timeCards");

        return updatedUser;
      }
      throw new AuthenticationError("You must log in first");
    },

    clockOut: async (parent, { timestamp, status }, context) => {
      if (context.employee) {
        console.log("timestamp", timestamp);
        console.log("choice", status);

        const updatedUser = await Employee.findOneAndUpdate(
          { _id: context.employee._id },
          { $push: { timeCards: { timestamp, status } } },
          { new: true }
        ).populate("timeCards");

        return updatedUser;
      }
      throw new AuthenticationError("You must log in first");
    },

    addWorkOrder: async (
      parent,
      { workOrderClient, workOrderDate, workOrderDescription, clientId },
      context
    ) => {
      console.log(context.employee);

      if (context.employee) {
        const updatedClient = await Client.findOneAndUpdate(
          { _id: clientId },
          {
            $push: {
              workOrders: {
                workOrderClient,
                workOrderDate,
                workOrderDescription
              }
            }
          },
          { new: true }
        ).populate("workOrders");

        return updatedClient;
      }
    },

    addClient: async (parent, args) => {
      const client = await Client.create(args);

      return client;
    },

    editEmployee: async (parent, args) => {
      const {
        employeeId,
        firstName,
        lastName,
        address,
        email,
        phone,
        password
      } = args;

      return await Employee.findByIdAndUpdate(
        { _id: employeeId },
        { firstName,
        lastName,
        address,
        phone,
        email,
        password
        },  { new: true });
    },

    editClient: async (parent, args) => {
      const {
        clientId,
        firstName,
        lastName,
        address,
        phone,
        email
      } = args;

      return await Client.findByIdAndUpdate(
        { _id: clientId }, 
        { firstName, lastName, address, phone, email }, 
        { new: true}
        )},

    deleteEmployee: async (parent, { employeeId }) => {
      return await Employee.findByIdAndDelete(
        { _id: employeeId }
      );
    },

    deleteClient: async (parent, { clientId }) => {
      return await Client.findOneAndDelete(
        { _id: clientId }
      );
    }
  }
};

module.exports = resolvers;
