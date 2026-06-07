import { Router } from "express";
import { celebrate } from "celebrate";

import { feedbacks } from "../controllers/index.js";
import {
  createFeedbackSchema,
  getFeedbacksSchema,
} from "../validations/index.js";

import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.get("/", celebrate(getFeedbacksSchema), feedbacks.getFeedbacks);

router.post(
  "/",
  authenticate,
  celebrate(createFeedbackSchema),
  feedbacks.createFeedback,
);

export default router;
