import gql from 'graphql-tag';

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
   mutation clockIn($time: [timestamptz]!) {
        clockIn(time: $time) {
             user {
               timecard
             }
        }
   }
 `;


 export const CLOCK_OUT = gql`
   mutation clockOut($time: [timestamp]!) {
        clockOut(time: $time) {
             user {
                  timecard
             }
        }
   }
 `;

 export const DISPATCH_TO_DB = gql`
   mutation dispatchToDB($time: Int!, $id: ID!) {
     dispatch(time: $time, id: $id) {
       workOrders {
         timeClock {
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
         timeClock {
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
         timeClock {
           departed
         }
       }
     }
   }
 `;