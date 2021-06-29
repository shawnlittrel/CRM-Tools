// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
// TODO timecard formatting?
const typeDefs = gql`
type Employee {
  _id: ID
  firstName: String
    lastName: String
    street: String
    city: String
    state: String
    zipcode: Int
    email: String
    phone: String
    timeCards: [TimeCard]
}  

type Client {
    _id: ID
    firstName: String
    lastName: String
    street: String
    city: String
    state: String
    zipcode: Int
    email: String
    phone: String
    workOrders: [WorkOrder]
  }
  
  type WorkOrder {
    _id: ID
    date: String
    description: String
    notes: 
    parts: 
    invoice: 
    timeClocks: [TimeClock]
  }

  type TimeClock {
    dispatched: String
    arrived: String
    departed: String
  }

  type Query {
    me: Employee
    employees: [Employee]
    
  }
`;

// export the typeDefs
module.exports = typeDefs;

// employees: {
//     {
//     id,
//     name,
//     address,
//     email,
//     phone,
//     timecard
//     }
//   }
//   clients: {
//     {
//     id,
//     name,
//     address,
//     email,
//     phone,
//     workOrders {
//       id,
//       date,
//       description,
//       notes [],
//       parts [],
//       invoice
//       timeClock {
//         dispatched
//         arrived
//         departed
//       }
//     }
//     }
//   }
//   warehouse {
//   [Parts],
//   [LaborItems]
//   }
//   Parts {
//     id,
//     name,
//     description,
//     purchasePrice,
//     salePrice,
//     quantityOnHand,
//   }
//   LaborItems {
//   id,
//   name,
//   description,
//   rate
//   }