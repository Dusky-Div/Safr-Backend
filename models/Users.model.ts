import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    firebaseUID: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema, "User");
export default User;
