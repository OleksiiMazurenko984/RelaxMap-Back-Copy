import { Schema, model } from "mongoose";

const userShema = new Schema({});

export const UserModel = model("User", userShema);
