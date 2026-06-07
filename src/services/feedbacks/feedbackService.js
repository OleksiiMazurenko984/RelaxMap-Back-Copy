import createHttpError from "http-errors";
import { FeedbackModel, LocationModel } from "../../models/index.js";

export const feedbackService = {
  async createFeedback({ locationId, rate, description, userName }) {
    const location = await LocationModel.findById(locationId);

    if (!location) {
      throw createHttpError(404, "Location not found");
    }

    const feedback = await FeedbackModel.create({
      rate,
      description,
      userName,
    });

    await LocationModel.findByIdAndUpdate(locationId, {
      $push: { feedbacksId: feedback._id },
    });

    return feedback;
  },

  async getFeedbacksByLocation({ locationId, page, perPage }) {
    const location = await LocationModel.findById(locationId);

    if (!location) {
      throw createHttpError(404, "Location not found");
    }

    if (!location.feedbacksId?.length) {
      return {
        page,
        perPage,
        totalItems: 0,
        totalPages: 0,
        feedbacks: [],
      };
    }

    const skip = (page - 1) * perPage;
    const filter = {
      _id: { $in: location.feedbacksId },
    };
    const feedbacksQuery = FeedbackModel.find(filter);
    const [totalItems, feedbacks] = await Promise.all([
      feedbacksQuery.clone().countDocuments(),
      feedbacksQuery.skip(skip).limit(perPage).sort({ createdAt: -1 }),
    ]);
    const totalPages = Math.ceil(totalItems / perPage);

    return {
      page,
      perPage,
      totalItems,
      totalPages,
      feedbacks,
    };
  },
};
