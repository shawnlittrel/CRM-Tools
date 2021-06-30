const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type Query {
  thoughts: # what goes here?
}
`;

// export the typeDefs
module.exports = typeDefs;
