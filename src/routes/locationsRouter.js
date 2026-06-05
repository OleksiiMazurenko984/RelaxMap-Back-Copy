import { Router } from "express";
import { celebrate } from "celebrate";
import { locations } from "../controllers/index.js";
import { authenticate } from "../middleware/authenticate.js";
import {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
} from "../controllers/locations/locationController.js";

const locationsRouter = Router();

router.get("/api/locations", celebrate(getAllLocationsSchema), getAllLocations);

router.get(
  "/api/locations/:locationId",
  celebrate(locationIdSchema),
  getLocationById,
);

router.post(
  "/api/locations",
  authenticate,
  celebrate(createLocationSchema),
  createLocation,
);
router.patch(
  "/api/locations/:locationId",
  authenticate,
  celebrate(updateLocationSchema),
  updateLocation,
);

export default locationsRouter;
