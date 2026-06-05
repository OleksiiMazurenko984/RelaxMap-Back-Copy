import { LocationTypeModel } from "../../models/locationType.js";

export const getLocationTypes = async (req, res) => {
  const locationTypes = await LocationTypeModel.find().lean();

  if (!locationTypes || locationTypes.length === 0) {
    return res.status(404).json({ message: "Location types not found" });
  }

  res.status(200).json(locationTypes);
};
