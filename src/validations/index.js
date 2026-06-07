import {
  createLocationSchema,
  getAllLocationsSchema,
  locationIdSchema,
  updateLocationSchema,
} from "./locationValidation.js";
import { loginUserSchema, registerUserSchema } from "./authValidation.js";

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
