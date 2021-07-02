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
    timeCards: [Int]
  }

  type Part {
    _id: ID
    partProductName: String
    partProductDescription: String
    partPrice: String
  }

  type WorkOrder {
    _id: ID
    workOrderDate: String
    workOrderDescription: String
    workOrderNotes: [String]
    workOrderParts: [Part]
    workOrderInvoice: [String]
    workOrderTimeClock: [Int]
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
    employees(_id: ID): [Employee]
    employee(_id: ID!): Employee
    clients: [Client]
    client(_id: ID!): Client
  }

  type Mutation {
    addEmployee(
      _id: ID
      firstName: String
      lastName: String
      address: String
      email: String
      phone: String
    ): Employee

    addWorkOrder (
      _id: ID!
      workOrderDate: String!
      workOrderDescription: String!
      ): Client
  }
`;

// export the typeDefs
module.exports = typeDefs;
