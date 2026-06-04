import { LocationModel } from "../../models/location.js";
import { UserModel } from "../../models/user.js";

export const getCurrentUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }
  res.status(200).json(req.user);
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await UserModel.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
};

export const getUserLocations = async (req, res) => {
  const { userId } = req.params;
  const { page = 1, perPage = 6 } = req.query;
  const skip = (page - 1) * perPage;
  const locationsQuery = LocationModel.find({ ownerId: userId });

  const [totalLocations, locations] = await Promise.all([
    locationsQuery.clone().countDocuments(),
    locationsQuery.skip(skip).limit(perPage),
  ]);
  const totalPages = Math.ceil(totalLocations / perPage);

  res.status(200).json({
    page,
    perPage,
    totalLocations,
    totalPages,
    locations,
  });
};
