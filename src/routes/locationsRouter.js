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
import { uploadLocationImage } from "../middleware/multer.js";
import { validateCategory } from "../middleware/validateCategory.js";

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
  uploadLocationImage.single("image"),
  celebrate(createLocationSchema),
  validateCategory,
  locations.createLocation,
);
locationsRouter.patch(
  "/locations/:locationId",
  authenticate,
  uploadLocationImage.single("image"),
  celebrate(updateLocationSchema),
  validateCategory,
  locations.updateLocation,
);

export default locationsRouter;
