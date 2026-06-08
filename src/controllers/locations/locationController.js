import createHttpError from "http-errors";
import { LocationModel } from "../../models/location.js";
import { saveLocationImageToCloudinary } from "../../utils/saveFileToCloudinary.js";

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

  const locationsQuery = LocationModel.find(filter).sort({ createdAt: -1 });

  const [totalLocations, locations] = await Promise.all([
    LocationModel.countDocuments(filter),
    locationsQuery
      .skip(skip)
      .limit(Number(limit))
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

    const averageRate = ratesCount
      ? totalRate / ratesCount
      : locationObject.rate || 0;

    return {
      ...locationObject,
      rate: Number(averageRate.toFixed(1)),
    };
  });

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
