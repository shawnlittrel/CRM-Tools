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

  type Client {
    _id: ID
    firstName: String
    lastName: String
    address: String
    email: String
    phone: String
    workOrders: [WorkOrder]
  }

  type WorkOrder {
    _id: ID
    date: String
    description: String
    notes: [String]
    parts: [String]
    invoice: String
    timeClocks: [Int]
  }

  type Warehouse {
    parts: [String]
    laborItems: [String]
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
  }
`;

// export the typeDefs
module.exports = typeDefs;
