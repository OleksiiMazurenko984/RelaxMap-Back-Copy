import { Router } from "express";
import { userValidation } from "../validations/index.js";
import { celebrate } from "celebrate";
import { users } from "../controllers/index.js";

const usersRouter = Router();

usersRouter.get("/", users.getCurrentUser);

usersRouter.get(
  "/:userId",
  celebrate(userValidation.useruserIdSchema),
  users.getUserById,
);

usersRouter.get(
  "/:userId/locations",
  celebrate(userValidation.userLocationsSchema),
  users.getUserLocations,
);

export default usersRouter;
