// import {} from "./auth/authController.js";
// import {} from "./categories/categoriesController.js";
import { getRegions } from "./regions/regions.js";
// import {} from "./feedback/feedbackController.js";
import { getLocationTypes } from "./locations/locations.js";
import {
  getCurrentUser,
  getUserById,
  getUserLocations,
} from "./users/userController.js";

export const auth = {};
export const categories = { getRegions, getLocationTypes };
export const feedbacks = {};
export const locations = {};
export const users = { getCurrentUser, getUserById, getUserLocations };
