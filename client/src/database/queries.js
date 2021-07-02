import gql from "graphql-tag";

export const QUERY_TIMECARD = gql`
  query getTimecard($ID: ID!) {
    user(ID: $ID) {
      _id
      timecard
    }
  }
`;


export const QUERY_CLIENTS = gql`
  query getClients($ID: ID) {
       client(ID: $ID) {
            _id,
            name,
            address,
            email,
            phone,
            workOrders {
                 id,
                 date,
                 description,
                 notes,
                 parts,
                 invoice,
                 timeClock {
                      dispatched
                      arrived
                      departed
                 }
            }
       }
  }
`;

export const QUERY_CLIENTS_SHORT = gql`
  query getClients($name: String) {
       client(name: $name) {
            _id,
            name,
            address,
            email,
            phone
       }
  }
`;

export const QUERY_APPOINTMENTS = gql`
  query getClients($name: String) {
       client(name: $name) {
            workOrders {
                 id,
                 date,
                 description,
                 notes,
                 parts,
                 invoice,
                 timeClock {
                      dispatched
                      arrived
                      departed
                 }
            }
       }
  }
`;

export const QUERY_WAREHOUSE_SHORT = gql`
  query getProducts($name: String!) {
       product(name: $name) {
            _id,
            name,
            description,
            purchasePrice
       }
  }
`;

export const QUERY_EMPLOYEES = gql`
  query getEmployees($ID: ID) {
       employee(ID: $ID) {
            _id,
            firstName,
            lastName,
            address,
            email,
            phone,
            timeCards {
                 id,
                 date,
                 timeClock {
                      dispatched
                      arrived
                      departed
                 }
            }
       }
  }
`;