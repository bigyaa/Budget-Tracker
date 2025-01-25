import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    firebaseId: String!
    name: String!
    email: String!
  }

  type Transaction {
    id: ID!
    userId: String!
    type: String!
    description: String!
    amount: Float!
    date: String!
  }

  type Query {
    getTransactions: [Transaction]
  }

  type Mutation {
    addTransaction(type: String!, description: String!, amount: Float!): Transaction
    deleteTransaction(id: ID!): String
  }
`;

export default typeDefs;