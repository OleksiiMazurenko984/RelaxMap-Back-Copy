import { Schema, model } from "mongoose";

const feedbackSchema = new Schema(
  {
    rate: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

feedbackSchema.index({ createdAt: -1 });

export const FeedbackModel = model("Feedback", feedbackSchema);
