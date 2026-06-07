import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerUser, loginUser, refreshUserSession, logoutUser } from '../controllers/auth/authController.js';
import { registerUserSchema, loginUserSchema } from '../validations/authValidation.js';
import { authenticate } from '../middleware/authenticate.js';
import {authValidation} from "../validations/index.js";
import {auth} from "../controllers/index.js";

const router = Router();

router.post('/register', celebrate(authValidation.registerUserSchema), auth.registerUser);
router.post('/login', celebrate(authValidation.loginUserSchema),auth.loginUser);
router.post('/refresh', auth.refreshUserSession);
router.post('/logout', authenticate, auth.logoutUser);

export default router;