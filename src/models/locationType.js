import { Schema, model } from "mongoose";

const LocationTypeSchema = new Schema({
  type: { type: String, required: true },
  slug: { type: String, required: true },
  shortDescription: String,
});

export const LocationTypeModel = model(
  "LocationType",
  LocationTypeSchema,
  "location_types",
);
