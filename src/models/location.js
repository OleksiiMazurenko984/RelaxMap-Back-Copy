import { Schema, model } from "mongoose";

const locationShema = new Schema({});

export const LocationModel = model("Location", locationShema);
