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
      _id
      name
      address
      email
      phone
      workOrders {
        id
        date
        description
        notes
        parts
        invoice
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
query getClients {
  clients {
    _id
    firstName
    lastName
    address
    email
    phone
  }
}
`;

export const QUERY_APPOINTMENTS = gql`
  query getClients($name: String) {
    client(name: $name) {
      workOrders {
        id
        date
        description
        notes
        parts
        invoice
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
  query getProducts {
    product {
      _id
      partProductName
      partProductDescription
      partPrice
    }
  }
`;

export const QUERY_EMPLOYEES = gql`
  query getEmployees($ID: ID) {
    employee(ID: $ID) {
      _id
      firstName
      lastName
      address
      email
      phone
      timeCard
    }
  }
`;

export const QUERY_DOCUMENTS_SHORT = gql`
  query getDocuments($id: ID) {
    documents(id: $id) {
      _id
      title
      text
    }
  }
`;

export const QUERY_EMPLOYEES_SHORT = gql`
  query getEmployees($id: ID) {
    employees(_id: $id) {
      _id
      firstName
      lastName
      address
      email
      phone
    }
  }
`;
