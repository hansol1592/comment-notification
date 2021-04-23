import gql from "graphql-tag";

export const CHATTING = gql`
  query {
    chatting {
      id
      writer
      description
    }
  }
`;
