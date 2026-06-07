import { authService } from "./auth/authService.js";
import { categoriesService } from "./categories/categoriesService.js";
import { feedbackService } from "./feedbacks/feedbackService.js";
import { locationService } from "./locations/locationService.js";
import { userService } from "./users/userService.js";

export const auth = {
  ...authService,
};

export const categories = {
  ...categoriesService,
};

export const feedbacks = {
  ...feedbackService,
};

export const locations = {
  ...locationService,
};

export const users = {
  ...userService,
};
