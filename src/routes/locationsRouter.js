import { Router } from "express";
import { celebrate } from "celebrate";
import { locations } from "../controllers/index.js";
import { authenticate } from "../middleware/authenticate.js";
import {
  createLocationSchema,
  getAllLocationsSchema,
  locationIdSchema,
  updateLocationSchema,
} from "../validations/locationValidation.js";

const locationsRouter = Router();

locationsRouter.get(
  "/locations",
  celebrate(getAllLocationsSchema),
  locations.getLocations,
);

locationsRouter.get(
  "/locations/:locationId",
  celebrate(locationIdSchema),
  locations.getLocationById,
);

locationsRouter.post(
  "/locations",
  authenticate,
  celebrate(createLocationSchema),
  locations.createLocation,
);
locationsRouter.patch(
  "/locations/:locationId",
  authenticate,
  celebrate(updateLocationSchema),
  locations.updateLocation,
);

export default locationsRouter;
