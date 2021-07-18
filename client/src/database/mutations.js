import gql from "graphql-tag";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const CLOCK_IN = gql`
mutation clockIn($timestamp: String!, $status: String!) {
  clockIn(timestamp: $timestamp, status: $status) {
      firstName
    	lastName
    	timeCards{
        _id
        timestamp
        status
      }
    }
  }
`;

export const CLOCK_OUT = gql`
mutation clockOut($timestamp: String!, $status: String!) {
  clockOut(timestamp: $timestamp, status: $status) {
      firstName
    	lastName
    	timeCards{
        _id
        timestamp
        status
      }
    }
  }
`;

export const DISPATCH_TO_DB = gql`
  mutation dispatchToDB($time: Int!, $id: ID!) {
    dispatch(time: $time, id: $id) {
      workOrders {
        billableTime {
          dispatched
        }
      }
    }
  }
`;

export const ARRIVE_TO_DB = gql`
  mutation arriveToDB($time: Int!, $id: ID!) {
    dispatch(time: $time, id: $id) {
      workOrders {
        billableTime {
          arrived
        }
      }
    }
  }
`;

export const DEPART_TO_DB = gql`
  mutation departToDB($time: Int!, $id: ID!) {
    depart(time: $time, id: $id) {
      workOrders {
        billableTime {
          departed
        }
      }
    }
  }
`;

export const NOTE_TO_DB = gql`
  mutation noteToDB($noteText: String!) {
    noteToDB(notetext: $noteText) {
      clients {
        workorders {
          notes {
            noteText
          }
        }
      }
    }
  }
`;

export const ADD_WORK_ORDER = gql `
mutation addWorkOrder($workOrderDate: String!, $workOrderClient: String!, $workOrderDescription: String!, $clientId: ID!) {
  addWorkOrder(clientId: $clientId, workOrderClient: $workOrderClient, workOrderDate: $workOrderDate, workOrderDescription: $workOrderDescription) {
    workOrders {
      _id
      workOrderDate
      workOrderDescription
    }
  }
}
`;

export const ADD_CLIENT = gql`
mutation addClient($firstName: String!, $lastName: String!, $address: String!, $email: String!,  $phone: String!) {
  addClient(firstName: $firstName, lastName: $lastName, address: $address, phone: $phone, email: $email) {
    _id
  }
}
`;

export const ADD_EMPLOYEE = gql`
mutation addEmployee($firstName: String!, $lastName: String!, $address: String!, $email: String!, $phone: String!, $password: String!) {
  addEmployee(firstName:$firstName, lastName:$lastName, address:$address, email:$email, phone:$phone, password: $password){
		_id
    firstName
    lastName
  }
}
 `;
