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
  },
);

locationSchema.index({ region: 1, locationType: 1 });
locationSchema.index({ name: "text" });
locationSchema.index({ ownerId: 1 });

export const LocationModel = model("Location", locationSchema);
