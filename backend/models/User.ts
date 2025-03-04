import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for User document
export interface IUser extends Document {
  firebaseId: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the schema
const UserSchema: Schema = new Schema(
  {
    firebaseId: { 
      type: String, 
      required: true, 
      unique: true,
      index: true
    },
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      index: true 
    },
  },
  { timestamps: true }
);

// Create and export the model
export const User = mongoose.model<IUser>('User', UserSchema);

export default User;