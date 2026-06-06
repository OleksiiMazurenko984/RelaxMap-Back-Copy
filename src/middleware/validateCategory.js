import createHttpError from "http-errors";
import { LocationTypeModel } from "../models/locationType.js";
import { RegionModel } from "../models/region.js";

export const validateCategory = async (req, res, next) => {
  const { region, locationType } = req.body;

  const [regionExists, locationTypeExists] = await Promise.all([
    RegionModel.exists({ region }),
    LocationTypeModel.exists({ locationType }),
  ]);

  if (!regionExists) {
    throw createHttpError(400, "Region does not exist");
  }

  if (!locationTypeExists) {
    throw createHttpError(400, "Location type does not exist");
  }

  next();
};
