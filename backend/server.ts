// server.ts is the entry point of the server application. It connects to the database, initializes the Apollo Server, and starts the Express server.

import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http';

import connectDB from './config/db';
import admin from './config/firebaseAdmin';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema';

// Load environment variables first
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Add essential Express middleware
app.use(cors());
app.use(express.json());

// Authentication middleware
const getAuthenticatedUser = async (token: string) => {
  if (!token) return null;
  
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return { userId: decodedToken.uid };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};

async function startServer() {
  try {
    // Connect to database
    await connectDB();
    console.log('Database connected');
    
    // Configure Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => {
        const token = req.headers.authorization?.split("Bearer ")[1];
        if (!token) return {};
        try {
          return await getAuthenticatedUser(token);
        } catch (error) {
          return {};
        }
      },
    });
    
    // Start Apollo Server
    await server.start();
    
    // Apply middleware (with type assertion)
    server.applyMiddleware({ app: app as any });
    
    // Create HTTP server
    const httpServer = http.createServer(app);
    
    // Start Express server
    httpServer.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
}

startServer();