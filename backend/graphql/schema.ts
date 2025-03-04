import { gql } from 'apollo-server-express';

const typeDefs = gql`
  enum TransactionType {
    INCOME
    EXPENSE
  }

  type User {
    id: ID!
    firebaseId: String!
    name: String!
    email: String!
    transactions: [Transaction]
  }

  type Transaction {
    id: ID!
    userId: String!
    type: TransactionType!
    description: String!
    amount: Float!
    date: String!
    user: User
  }

  input TransactionInput {
    type: TransactionType!
    description: String!
    amount: Float!
    date: String
  }

  type Query {
    getTransactions(userId: String): [Transaction]
    getTransaction(id: ID!): Transaction
  }

  type Mutation {
    addTransaction(input: TransactionInput!): Transaction
    updateTransaction(id: ID!, input: TransactionInput!): Transaction
    deleteTransaction(id: ID!): Boolean
  }
`;

export default typeDefs;