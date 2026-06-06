import { Schema, model } from "mongoose";

const RegionSchema = new Schema({
  region: { type: String, required: true },
  slug: { type: String, required: true },
  level: String,
  note: String,
});

export const RegionModel = model("Region", RegionSchema, "regions");
