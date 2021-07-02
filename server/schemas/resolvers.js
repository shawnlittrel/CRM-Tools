const { Client, Employee } = require('../models');
const client = require('../models/client');

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

            return employee;
        },

        addWorkOrder: async (parent, args) => {
            const updatedClient = await Client.findOneAndUpdate(
                { _id: args.id},
                { $push: { 
                    workOrders: { 
                        workOrderDate: args.date, 
                        workOrderDescription: args.description,
                    }}}

            )

            return updatedClient;
        }
    }
};

module.exports = resolvers;