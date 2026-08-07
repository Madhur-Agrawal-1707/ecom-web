import { Schema, model } from "mongoose";
import type { IUser } from "./auth.interfaces.js";
import { hashPassword, comparePasswords } from "./password.util.js";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      select: false,
      // Required only for local accounts; Google-provider users won't have one.
      required: function (this: IUser) {
        return this.provider === "local";
      },
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
      required: true,
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
      required: true,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    tokenVersion: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    next();
    return;
  }

  this.password = await hashPassword(this.password);
  next();
});

userSchema.methods.comparePassword = async function (
  this: IUser,
  candidate: string,
): Promise<boolean> {
  if (!this.password) {
    return false;
  }

  return comparePasswords(candidate, this.password);
};

export const UserModel = model<IUser>("User", userSchema);