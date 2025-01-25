import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import connectDB from "./config/db";
import admin from "./config/firebaseAdmin";
import dotenv from "dotenv";

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
      throw new Error("Unauthorized");
    }
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));