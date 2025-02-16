import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import express from 'express';

import connectDB from './config/db';
import admin from './config/firebaseAdmin';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema';

dotenv.config();
connectDB();

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) throw new Error("Unauthorized");

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return { userId: decodedToken.uid };
    } catch (error) {
      throw new Error("Unauthorized", error);
    }
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));