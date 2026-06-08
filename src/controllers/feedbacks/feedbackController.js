import { feedbacks } from "../../services/index.js";

export const createFeedback = async (req, res, next) => {
  try {
    const { locationId, rate, description } = req.body;
    const feedback = await feedbacks.createFeedback({
      locationId,
      rate,
      description,
      userName: req.user.name,
    });

    res.status(201).json(feedback);
  } catch (error) {
    next(error);
  }
};

export const getFeedbacks = async (req, res, next) => {
  try {
    const { locationId, page, perPage } = req.query;
    const data = await feedbacks.getFeedbacksByLocation({
      locationId,
      page,
      perPage,
    });

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
