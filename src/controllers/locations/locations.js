import { LocationTypeModel } from "../../models/locationType.js";

export const getLocationTypes = async (req, res) => {
  const locationTypes = await LocationTypeModel.find().lean();

  if (!locationTypes) {
    return res.status(404).json({ message: "Location types not found" });
  }

  res.status(200).json(locationTypes);
};
