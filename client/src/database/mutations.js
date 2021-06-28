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
   mutation clockOut($time: [timestamptz]!) {
        clockOut(time: $time) {
             user {
                  timecard
             }
        }
   }
 `;