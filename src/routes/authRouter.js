import { Router } from "express";
import { celebrate } from "celebrate";
import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
} from "../controllers/auth/authController.js";
import {
  registerUserSchema,
  loginUserSchema,
} from "../validations/authValidation.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.post("/register", celebrate(registerUserSchema), registerUser);
router.post("/login", celebrate(loginUserSchema), loginUser);
router.post("/refresh", refreshUserSession);
router.post("/logout", authenticate, logoutUser);

export default router;
