import gql from "graphql-tag";

export const patientTypeDefs = gql`
  type AddressInfo {
    address: String
    city: String
    state: String
    country: String
  }

  type Patient {
    id: ID!
    name: String!
    email: String!
    phone: String
    gender: String
    dob: String
    physician: Physician!
    addressInfo: AddressInfo
    country: String
  }

  input AddressInfoInput {
    address: String
    city: String
    state: String
    country: String
  }

  input PatientInput {
    email: String!
    name: String!
    phone: String
    gender: String
    dob: String
    physician: ID!
    addressInfo: AddressInfoInput
    country: String
  }

  type PatientPagination {
    data: [Patient]
    total: Int
    totalPages: Int
  }

  extend type Query {
    patients(page: Int, limit: Int, filter: String): PatientPagination
    patient(id: ID!): Patient
  }

  extend type Mutation {
    createPatient(input: PatientInput!): Patient
    updatePatient(id: ID!, input: PatientInput!): Patient
    deletePatient(id: ID!): Boolean
  }
`;
