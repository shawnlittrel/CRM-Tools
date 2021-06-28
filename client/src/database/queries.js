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
            id,
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
  query getClients($ID: ID) {
       client(ID: $ID) {
            id,
            name,
            address,
            email,
            phone
       }
  }
`;