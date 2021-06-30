const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  
type Employee {
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

type:Workorder {
  
}


type Query {
  thoughts: # what goes here?
}
`;

// export the typeDefs
module.exports = typeDefs;
