import {
  createLocationSchema,
  getAllLocationsSchema,
  locationIdSchema,
  updateLocationSchema,
} from "./locationValidation.js";
import { loginUserSchema, registerUserSchema } from "./authValidation.js";
import {
  userIdSchema,
  userLocationsSchema,
  userUpdateSchema,
} from "./userValidation.js";

export const authValidation = {
  registerUserSchema,
  loginUserSchema,
};

export const locations = {
  createLocationSchema,
  getAllLocationsSchema,
  locationIdSchema,
  updateLocationSchema,
};
export {
  createFeedbackSchema,
  getFeedbacksSchema,
} from "./feedbackValidation.js";

export const userValidation = {
  userIdSchema,
  userLocationsSchema,
  userUpdateSchema,
};
