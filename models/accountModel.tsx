import mongoose, { Document, Model, Schema } from "mongoose";

// Define the Admin model
export interface IAdmin extends Document {
  username: string;
  email: string;
  password: string;
}

const adminSchema: Schema<IAdmin> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username cannot be empty"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email cannot be empty"],
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

const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", adminSchema);

// Define the User model
export interface IUser extends Document {
  companyName: string;
  fullName: string;
  position: string;
  userName: string;
  email: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name cannot be empty"],
    },
    fullName: {
      type: String,
      required: [true, "Full name cannot be empty"],
    },
    position: {
      type: String,
      required: [true, "Position cannot be empty"],
    },
    userName: {
      type: String,
      required: [true, "Username cannot be empty"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email cannot be empty"],
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

export { Admin, User };
