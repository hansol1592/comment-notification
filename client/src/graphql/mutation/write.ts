import gql from "graphql-tag";

export const WRITE = gql`
  mutation write($writer: String!, $description: String!) {
    write(writer: $writer, description: $description)
  }
`;
