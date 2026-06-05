import { Router } from "express";
import { celebrate } from "celebrate";
import { locations } from "../controllers/index";
import { authenticate } from "../middleware/authenticate.js";
import {
  createLocationSchema,
  getAllLocationsSchema,
  locationIdSchema,
  updateLocationSchema,
} from "../validations/locationsValidation.js";

const locationsRouter = Router();

router.get(
  "/api/locations",
  celebrate(getAllLocationsSchema),
  locations.getAllLocations,
);

router.get(
  "/api/locations/:locationId",
  celebrate(locationIdSchema),
  locations.getLocationById,
);

router.post(
  "/api/locations",
  authenticate,
  uploadLocationImage.single("images"),
  celebrate(createLocationSchema),
  locations.createLocation,
);
router.patch(
  "/api/locations/:locationId",
  authenticate,
  celebrate(updateLocationSchema),
  locations.updateLocation,
);

export default locationsRouter;
