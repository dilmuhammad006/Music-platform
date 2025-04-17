import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    email: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    role: {
      type: mongoose.SchemaTypes.String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    token: {
      type: mongoose.SchemaTypes.String,
      required: false,
    },
  },
  {
    collection: "User",
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", userSchema)