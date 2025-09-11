import gql from "graphql-tag";

export const physicianTypeDefs = gql`
  type Physician {
    id: ID!
    email: String!
    name: String!
    title: String!
    phone: String
    gender: String
    dob: String
  }

  input PhysicianInput {
    email: String!
    name: String!
    title: String!
    phone: String
    gender: String
    dob: String
  }

  type Query {
    physicians: [Physician]
  }

  type Mutation {
    createPhysician(input: PhysicianInput!): Physician
  }
`;
