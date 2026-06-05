import { RegionModel } from "../../models/region.js";

export const getRegions = async (req, res) => {
  const regions = await RegionModel.find().lean();

  if (!regions || regions.length === 0) {
    return res.status(404).json({ message: "Regions not found" });
  }

  res.status(200).json(regions);
};
