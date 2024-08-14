import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
}
const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username cannot be empty"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password cannot be empty"],
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
