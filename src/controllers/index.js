// import {} from "./auth/authController.js";
// import {} from "./categories/categoriesController.js";
import { getRegions } from "./regions/regions.js";
import {
  createFeedback,
  getFeedbacks,
} from "./feedbacks/feedbackController.js";
import { getLocationTypes } from "./locations/locations.js";
import {
  getLocations,
  getLocationById,
  createLocation,
  updateLocation,
} from "./locations/locationController.js";
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from "./auth/authController.js";
import {
  getCurrentUser,
  getUserById,
  getUserLocations,
  updateCurrentUser,
} from "./users/userController.js";

export const auth = { registerUser, loginUser, refreshUserSession, logoutUser };
export const categories = { getRegions, getLocationTypes };
export const feedbacks = { createFeedback, getFeedbacks };
export const locations = {
  getLocations,
  getLocationById,
  createLocation,
  updateLocation,
};
export const users = {
  getCurrentUser,
  getUserById,
  getUserLocations,
  updateCurrentUser,
};
