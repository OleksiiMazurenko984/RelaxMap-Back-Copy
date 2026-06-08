import { Router } from "express";
import { userValidation } from "../validations/index.js";
import { celebrate } from "celebrate";
import { users } from "../controllers/index.js";
import { authenticate } from "../middleware/authenticate.js";

const usersRouter = Router();

usersRouter.get("/", authenticate, users.getCurrentUser);

usersRouter.get(
  "/:userId",
  celebrate(userValidation.userIdSchema),
  users.getUserById,
);

usersRouter.get(
  "/:userId/locations",
  celebrate(userValidation.userLocationsSchema),
  users.getUserLocations,
);

export default usersRouter;
