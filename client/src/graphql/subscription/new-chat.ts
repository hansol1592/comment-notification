import gql from "graphql-tag";

export const NEW_CHAT = gql`
  subscription NewChat($writer: String!) {
    newChat(writer: $writer) {
      id
      writer
      description
    }
  }
`;
