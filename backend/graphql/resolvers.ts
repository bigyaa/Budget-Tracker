import redis from '../config/redis';
import Transaction from '../models/Transaction';

const resolvers = {
  Query: {
    getTransactions: async (_, __, { userId }) => {
      const cacheKey = `transactions:${userId}`;
      const cachedTransactions = await redis.get(cacheKey);
      if (cachedTransactions) {
        return JSON.parse(cachedTransactions);
      }

      const transactions = await Transaction.find({ userId });
      redis.setex(cacheKey, 3600, JSON.stringify(transactions));
      return transactions;
    },
  },

  Mutation: {
    addTransaction: async (_, { type, description, amount }, { userId }) => {
      const transaction = new Transaction({ userId, type, description, amount });
      await transaction.save();

      redis.del(`transactions:${userId}`); // Clear cache
      return transaction;
    },

    deleteTransaction: async (_, { id }, { userId }) => {
      await Transaction.findOneAndDelete({ _id: id, userId });

      redis.del(`transactions:${userId}`); // Clear cache
      return "Transaction deleted";
    },
  },
};

export default resolvers;