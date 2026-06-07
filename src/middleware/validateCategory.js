import createHttpError from "http-errors";
import { LocationTypeModel } from "../models/locationType.js";
import { RegionModel } from "../models/region.js";

export const validateCategory = async (req, res, next) => {
  const { region, locationType } = req.body;

  const [regionExists, locationTypeExists] = await Promise.all([
    RegionModel.exists({ slug: region }),
    LocationTypeModel.exists({ slug: locationType }),
  ]);

  if (region) {
    const regionExists = await RegionModel.exists({ slug: region });

    if (!regionExists) {
      throw createHttpError(400, "Region does not exist");
    }
  }

  if (locationType) {
    const locationTypeExists = await LocationTypeModel.exists({
      slug: locationType,
    });

    if (!locationTypeExists) {
      throw createHttpError(400, "Location type does not exist");
    }
  }

  next();
};
