import redis from '../config/redis';
import Transaction from '../models/Transaction';

// Cache utility functions
const cacheUtils = {
  getFromCache: async (key: string) => {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  },
  
  setCache: (key: string, data: any, expiry = 3600) => {
    return redis.setex(key, expiry, JSON.stringify(data));
  },
  
  invalidateCache: (key: string) => {
    return redis.del(key);
  }
};

// Define interfaces for the types
interface TransactionInput {
  type: string;
  description: string;
  amount: number;
}

interface TransactionDeleteInput {
  id: string;
}

interface ResolverContext {
  userId?: string;
}

interface TransactionDocument {
  userId: string;
  type: string;
  description: string;
  amount: number;
  _id?: any; // Changed from string to any to accommodate MongoDB's ObjectId
  __v?: number; // Added __v for version key that MongoDB adds
}

const resolvers = {
  Query: {
    getTransactions: async (_: unknown, __: unknown, { userId }: ResolverContext): Promise<TransactionDocument[]> => {
      if (!userId) throw new Error('Authentication required');
      
      const cacheKey = `transactions:${userId}`;
      
      // Try to get from cache first
      const cachedTransactions = await cacheUtils.getFromCache(cacheKey);
      if (cachedTransactions) {
        return cachedTransactions;
      }
      
      // Get from database and cache the result
      try {
        const transactions = await Transaction.find({ userId });
        await cacheUtils.setCache(cacheKey, transactions);
        return transactions;
      } catch (error) {
        console.error('Error fetching transactions:', error);
        throw new Error('Failed to fetch transactions');
      }
    },
  },

  Mutation: {
    addTransaction: async (_: unknown, { type, description, amount }: TransactionInput, { userId }: ResolverContext): Promise<TransactionDocument> => {
      if (!userId) throw new Error('Authentication required');
      
      try {
        const transaction = new Transaction({ userId, type, description, amount });
        await transaction.save();
        
        // Invalidate cache
        await cacheUtils.invalidateCache(`transactions:${userId}`);
        return transaction;
      } catch (error) {
        console.error('Error adding transaction:', error);
        throw new Error('Failed to add transaction');
      }
    },

    deleteTransaction: async (_: unknown, { id }: TransactionDeleteInput, { userId }: ResolverContext): Promise<string> => {
      if (!userId) throw new Error('Authentication required');
      
      try {
        const result = await Transaction.findOneAndDelete({ _id: id, userId });
        if (!result) throw new Error('Transaction not found');
        
        // Invalidate cache
        await cacheUtils.invalidateCache(`transactions:${userId}`);
        return "Transaction deleted";
      } catch (error) {
        console.error('Error deleting transaction:', error);
        throw new Error('Failed to delete transaction');
      }
    },
  },
};

export default resolvers;