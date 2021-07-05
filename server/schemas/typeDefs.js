// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
// TODO timecard formatting?
const typeDefs = gql`
  type Employee {
    _id: ID
    firstName: String
    lastName: String
    address: String
    email: String
    phone: String
    timeCards: [TimeCard]
  }

  type TimeCard {
    _id: ID
    timecard: String
  }

  type Part {
    _id: ID
    partProductName: String
    partProductDescription: String
    partPrice: String
  }

  type BillableTime {
    _id: ID

  }

  type WorkOrder {
    _id: ID
    workOrderDate: String
    workOrderDescription: String
    workOrderNotes: [String]
    workOrderParts: [Part]
    workOrderInvoice: [String]
    workOrderBillableTime: [BillableTime]
  }

  type Client {
    _id: ID
    firstName: String
    lastName: String
    address: String
    email: String
    phone: String
    workOrders: [WorkOrder]
  }

  type Warehouse {
    parts: [Part]
    laborItems: [String]
  }

  type Auth {
    token: ID
    user: Employee
  }

  type Query {
    me: Employee
    employees(_id: ID): [Employee]!
    employee(_id: ID!): Employee
    clients: [Client]!
    client(_id: ID!): Client
    workOrders: [WorkOrder]!
    workOrder(_id: ID!): WorkOrder
  }

  type Mutation {
    addEmployee(_id: ID, firstName: String!, lastName: String!, address: String!, email: String, phone: String!): Auth
    login(email: String!, password: String!): Auth
    addWorkOrder(_id: ID, workOrderDate: String!, workOrderDescription: String, workOrderNotes: [String], workOrderParts: [String], workOrderInvoice: [String],workOrderBillableTime: [Int]): Client
  }
`;
    // TODO would addWorkOrder in type mutation return Client parent?

// export the typeDefs
module.exports = typeDefs;
