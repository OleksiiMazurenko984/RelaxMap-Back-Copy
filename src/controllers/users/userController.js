import { LocationModel } from "../../models/location.js";
import { User } from "../../models/user.js";
import createHttpError from "http-errors";

export const getCurrentUser = async (req, res) => {
  if (!req.user) {
    throw createHttpError(401, "Not authorized");
  }
  res.status(200).json(req.user);
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  res.status(200).json(user);
};

export const getUserLocations = async (req, res) => {
  const { userId } = req.params;
  const { page = 1, perPage = 6 } = req.query;

  const user = await User.findById(userId);

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const skip = (page - 1) * perPage;

  const locationsQuery = LocationModel.find({ ownerId: userId });

  const [totalLocations, locations] = await Promise.all([
    locationsQuery.clone().countDocuments(),
    locationsQuery
      .skip(skip)
      .limit(Number(perPage))
      .populate("feedbacksId", "rate"),
  ]);

  const locationsWithAverageRate = locations.map((location) => {
    const locationObject = location.toObject();

    const feedbacks = locationObject.feedbacksId || [];

    let totalRate = 0;
    let ratesCount = 0;

    for (const feedback of feedbacks) {
      if (feedback && typeof feedback.rate === "number") {
        totalRate += feedback.rate;
        ratesCount += 1;
      }
    }

    const averageRate = ratesCount ? totalRate / ratesCount : 0;

    return {
      ...locationObject,
      rate: Number(averageRate.toFixed(1)),
    };
  });

  const totalPages = Math.ceil(totalLocations / perPage);

  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
    totalLocations,
    totalPages,
    locations,
  });
};
