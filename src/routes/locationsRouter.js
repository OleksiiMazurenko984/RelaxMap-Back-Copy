import { Router } from "express";
import { celebrate } from "celebrate";
import { locations } from "../controllers/index.js";
import { authenticate } from "../middleware/authenticate.js";
import { locations as locationsValidation } from "../validations/index.js";
import { uploadLocationImage } from "../middleware/multer.js";
import { validateCategory } from "../middleware/validateCategory.js";

const locationsRouter = Router();

locationsRouter.get(
  "/",
  celebrate(locationsValidation.getAllLocationsSchema),
  locations.getLocations,
);

locationsRouter.get(
  "/:locationId",
  celebrate(locationsValidation.locationIdSchema),
  locations.getLocationById,
);

locationsRouter.post(
  "/",
  authenticate,
  uploadLocationImage.single("image"),
  celebrate(locationsValidation.createLocationSchema),
  validateCategory,
  locations.createLocation,
);
locationsRouter.patch(
  "/:locationId",
  authenticate,
  uploadLocationImage.single("image"),
  celebrate(locationsValidation.updateLocationSchema),
  validateCategory,
  locations.updateLocation,
);

export default locationsRouter;
