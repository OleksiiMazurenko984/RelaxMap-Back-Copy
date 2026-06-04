import { Schema, model } from "mongoose";

const feedbackShema = new Schema({});

export const FeedbackModel = model("feedback", feedbackShema);
