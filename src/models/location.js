import { Schema, model } from "mongoose";

const locationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 96,
      trim: true,
    },
    locationType: {
      type: String,
      required: true,
      maxlength: 64,
      trim: true,
    },
    region: {
      type: String,
      required: true,
      maxlength: 64,
      trim: true,
    },
    rate: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    description: {
      type: String,
      required: true,
      minlength: 20,
      maxlength: 6000,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    feedbacksId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Feedback",
      },
    ],
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

locationSchema.virtual("regionInfo", {
  ref: "Region",
  localField: "region",
  foreignField: "slug",
  justOne: true,
});

locationSchema.virtual("locationTypeInfo", {
  ref: "LocationType",
  localField: "locationType",
  foreignField: "slug",
  justOne: true,
});

locationSchema.index({ region: 1, locationType: 1 });
locationSchema.index({ name: "text" });
locationSchema.index({ ownerId: 1 });

export const LocationModel = model("Location", locationSchema);
