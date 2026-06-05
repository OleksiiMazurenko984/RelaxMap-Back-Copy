import { feedbackService } from "../../services/feedback/feedbackService.js";

export const createFeedback = async (req, res, next) => {
  try {
    const { locationId, rate, description, userName } = req.body;

    const feedback = await feedbackService.createFeedback({
      locationId,
      rate,
      description,
      userName,
    });

    res.status(201).json(feedback);
  } catch (error) {
    next(error);
  }
};

export const getFeedbacks = async (req, res, next) => {
  try {
    const { locationId, page, perPage } = req.query;
    const data = await feedbackService.getFeedbacksByLocation({
      locationId,
      page,
      perPage,
    });

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
