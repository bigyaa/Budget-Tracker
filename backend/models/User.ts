import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firebaseId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);