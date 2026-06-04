import {} from "./auth/authController";
import {} from "./categories/categoriesController";
import {} from "./feedback/feedbackController";
import {} from "./locations/locationController";
import {
  getCurrentUser,
  getUserById,
  getUserLocations,
} from "./users/userController.js";

export const auth = {};
export const categories = {};
export const feedbacks = {};
export const locations = {};
export const users = { getCurrentUser, getUserById, getUserLocations };
