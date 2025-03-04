import mongoose, { Schema, Document } from 'mongoose';

// Define transaction type enum
enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
  SAVING = 'saving'
}

// Interface for Transaction document
export interface ITransaction extends Document {
  userId: string;
  type: TransactionType;
  description: string;
  amount: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Create schema with proper types
const TransactionSchema = new Schema<ITransaction>(
  {
    userId: { type: String, required: true },
    type: { 
      type: String, 
      enum: Object.values(TransactionType), 
      required: true 
    },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Export both the model and the interfaces
export const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);
export default Transaction;