const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
 
type: Login {

}

type: Employee {
  _id: ID
  employeeName: String
  address: String
  email: String
  phone: Number
}

type: Client {
  _id: ID
  clientName: String
  address: String
  email: String
  phone: Number
}

type: Workorder {
  _id: ID
  date: Date
  description: String
  notes: Array
  parts: Array
invoice: String
}

type: tineclock {
  dispatched: Date
  arrived: Date
  departed: Date
}


type Query {
  thoughts: # what goes here?
}
`;

// export the typeDefs
module.exports = typeDefs;
