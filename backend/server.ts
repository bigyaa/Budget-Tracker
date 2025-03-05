import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import express, { Application } from 'express';

import connectDB from './config/db';
import admin from './config/firebaseAdmin';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema';

// Load environment variables first
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;

// Authentication middleware
const getAuthenticatedUser = async (token: string) => {
  if (!token) throw new Error("Authentication token required");
  
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return { userId: decodedToken.uid };
  } catch (error) {
    throw new Error("Invalid authentication token");
  }
};

// Configure Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization?.split("Bearer ")[1];
    return token ? await getAuthenticatedUser(token) : null;
  },
});

async function startServer() {
  try {
    // Connect to database
    await connectDB();
    console.log('Database connected');
    
    // Start Apollo Server
    await server.start();
    server.applyMiddleware({ app: app as any });
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
}

startServer();