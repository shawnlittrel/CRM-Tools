import gql from "graphql-tag";

export const QUERY_ME = gql`
  query me {
    me {
      firstName
      lastName
      timeCards {
        _id
        timestamp
        status
      }
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
        billableTime {
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

export const QUERY_CLIENT_NAMES = gql`
  query getClients {
    clients {
      _id
      firstName
      lastName
    }
  }
`;

export const QUERY_APPOINTMENTS = gql`
query getClients {
  clients {
    workOrders {
      _id
      workOrderClient
      workOrderDate
      workOrderDescription
    }
  }
}
`;

export const QUERY_WAREHOUSE_SHORT = gql`
  query getProducts($name: String!) {
       product(name: $name) {
            _id,
            partProductName,
            partProductDescription,
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
      timeCards {
        id
        date
        billableTime {
          dispatched
          arrived
          departed
        }
      }
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

// export const QUERY_INVOICE = gql `
// `