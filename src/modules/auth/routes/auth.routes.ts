import { Router } from "express";
import {
  signUpSchema,
  loginSchema,
  changePasswordSchema,
} from "../dto/request/request.dto";
import { validateRequestBody } from "../../../core/middlewares/validation.middleware";
import { authController } from "../di/dependency_injection";
import { authenticateUser } from "../../../core/middlewares/auth.middleware";

const router = Router();

//new user registration route
router.post(
  "/auth/register",
  validateRequestBody(signUpSchema),
  authController.signUpUser
);

//login existing user
router.post(
  "/auth/login",
  validateRequestBody(loginSchema),
  authController.logInUser
);

//change password
router.put(
  "/auth/password/change",
  validateRequestBody(changePasswordSchema),
  authenticateUser,
  authController.changePassword
);

export default router;
