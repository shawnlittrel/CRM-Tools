import gql from "graphql-tag";

export const QUERY_TIMECARD = gql`
  query getTimecard($ID: ID!) {
    user(ID: $ID) {
      _id
      timecard
    }
  }
`;
