import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    nombre: { type: String },
    cumple: { type: Date },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "https://cdn-icons-png.flaticon.com/512/266/266033.png" },
    rol: { type: String, default: "USER", enum: ["USER", "ADMIN", "PREM"], index: true },
  },
  { timestamps: true }
);

const User = model(collection, schema);
export default User;