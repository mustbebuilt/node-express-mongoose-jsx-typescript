import mongoose, { Document, Model, Schema } from "mongoose";

// Interface for User document
interface IUser extends Document {
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

// Define the user schema
const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  password: { type: String, required: true },
});

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export { IUser };
