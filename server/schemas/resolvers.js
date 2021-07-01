const { Client } = require('../models');

const resolvers = {
    Query: {
        // get all clients
        clients: async () => {
            return Client.find()
            .populate("workOrders");
        },

            // get single client
        client: async (parent, { _id }) => {
            return Client.findOne({ _id })
            .populate("workOrders");
        },

        // get all employees
        employees: async () => {
            return Employee.find()
            .populate("timeCards");
        },

        // get single employee
        employee: async(parent, { _id }) => {
            return Employee.findOne({ _id })
            .populate("timeCards");
        }
    },

    Mutation: {
        addEmployee: async (parent, args) => {
            const employee = await Employee.create(args);
        }
    }
};

module.exports = resolvers;