import createHttpError from "http-errors";
import { LocationModel } from "../../models/location.js";
import { saveLocationImageToCloudinary } from "../../utils/saveFileToCloudinary.js";

const getLocationTimestamp = (location) => {
  const time = new Date(location.createdAt || 0).getTime();

  return Number.isNaN(time) ? 0 : time;
};

const getLocationPopularityData = (location) => {
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

  const averageRate = ratesCount
    ? totalRate / ratesCount
    : locationObject.rate || 0;
  const roundedRate = Number(averageRate.toFixed(1));
  const feedbacksCount = feedbacks.length;

  return {
    location: {
      ...locationObject,
      rate: roundedRate,
    },
    feedbacksCount,
    popularityScore: feedbacksCount * roundedRate,
  };
};

const getLocationsSortedByPopularity = (locations) =>
  locations
    .map(getLocationPopularityData)
    .sort((currentLocation, nextLocation) => {
      const popularityDifference =
        nextLocation.popularityScore - currentLocation.popularityScore;

      if (popularityDifference !== 0) {
        return popularityDifference;
      }

      const feedbacksDifference =
        nextLocation.feedbacksCount - currentLocation.feedbacksCount;

      if (feedbacksDifference !== 0) {
        return feedbacksDifference;
      }

      const rateDifference =
        nextLocation.location.rate - currentLocation.location.rate;

      if (rateDifference !== 0) {
        return rateDifference;
      }

      return (
        getLocationTimestamp(nextLocation.location) -
        getLocationTimestamp(currentLocation.location)
      );
    })
    .map(({ location }) => location);

export const getLocations = async (req, res) => {
  const { page = 1, limit = 10, region, locationType, search } = req.query;
  const skip = (page - 1) * limit;

  const filter = {};

  if (region) {
    filter.region = region;
  }

  if (locationType) {
    filter.locationType = locationType;
  }

  if (search) {
    filter.$text = { $search: search };
  }

  const [totalLocations, locations] = await Promise.all([
    LocationModel.countDocuments(filter),
    LocationModel.find(filter).populate("feedbacksId", "rate"),
  ]);

  const locationsWithAverageRate = getLocationsSortedByPopularity(
    locations,
  ).slice(skip, skip + Number(limit));

  const totalPages = Math.ceil(totalLocations / limit);

  res.status(200).json({
    page,
    limit,
    totalLocations,
    totalPages,
    locations: locationsWithAverageRate,
  });
};

export const getLocationById = async (req, res) => {
  const { locationId } = req.params;

  const location = await LocationModel.findById(locationId);

  if (!location) {
    throw createHttpError(404, "Location not found");
  }

  res.status(200).json(location);
};

export const createLocation = async (req, res) => {
  const { file, user } = req;

  if (!file) {
    throw createHttpError(400, "Location image is required");
  }

  const location = new LocationModel({
    ...req.body,
    ownerId: user._id,
  });
  const result = await saveLocationImageToCloudinary(file.buffer, location._id);

  location.image = result.secure_url;
  await location.save();

  res.status(201).json(location);
};

export const updateLocation = async (req, res) => {
  const { locationId } = req.params;
  const { file, user } = req;

  const location = await LocationModel.findOne({
    _id: locationId,
    ownerId: user._id,
  });

  if (!location) {
    throw createHttpError(404, "Location not found");
  }

  const updateData = { ...req.body };

  if (file) {
    const result = await saveLocationImageToCloudinary(
      file.buffer,
      location._id,
    );
    updateData.image = result.secure_url;
  }

  location.set(updateData);

  await location.save();

  res.status(200).json(location);
};
