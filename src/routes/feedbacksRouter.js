import { Router } from "express";
import { celebrate } from "celebrate";
import {
  createFeedback,
  getFeedbacks,
} from "../controllers/feedbacks/feedbackController.js";

import {
  createFeedbackSchema,
  getFeedbacksSchema,
} from "../validations/feedbackValidation.js";

import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.get("/", celebrate(getFeedbacksSchema), getFeedbacks);
router.post("/", authenticate, celebrate(createFeedbackSchema), createFeedback);

export default router;
