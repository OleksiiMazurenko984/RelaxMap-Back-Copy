import createHttpError from "http-errors";
import { Location } from "../../models/location.js";
import { saveLocationImageToCloudinary } from "../../utils/saveFileToCloudinary.js";

export const getLocations = async (req, res) => {
  const { page = 1, limit = 10, region, type, search } = req.query;
  const skip = (page - 1) * limit;

  const filter = {};

  if (region) {
    filter.region = region;
  }

  if (type) {
    filter.type = type;
  }

  if (search) {
    filter.$text = { $search: search };
  }

  const locationsQuery = Location.find(filter).sort({ createdAt: -1 });

  const [totalLocations, locations] = await Promise.all([
    Location.countDocuments(filter),
    locationsQuery.skip(skip).limit(limit),
  ]);

  const totalPages = Math.ceil(totalLocations / limit);

  res.status(200).json({
    page,
    limit,
    totalLocations,
    totalPages,
    locations,
  });
};

export const getLocationById = async (req, res) => {
  const { locationId } = req.params;

  const location = await Location.findById(locationId);

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

  const location = new Location({
    ...req.body,
    userId: user._id,
  });
  const result = await saveLocationImageToCloudinary(file.buffer, location._id);

  location.image = result.secure_url;
  await location.save();

  res.status(201).json(location);
};

export const updateLocation = async (req, res) => {
  const { locationId } = req.params;
  const { file, user } = req;

  const location = await Location.findOne({
    _id: locationId,
    userId: user._id,
  });

  if (!location) {
    throw createHttpError(404, "Location not found");
  }

  if (file) {
    const result = await saveLocationImageToCloudinary(
      file.buffer,
      location._id,
    );
    image = result.secure_url;
  }

  location.set({
    ...req.body,
    image,
  });

  await location.save();

  res.status(200).json(location);
};
