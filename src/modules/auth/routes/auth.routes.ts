import { Router } from "express";
import { signUpSchema, loginSchema } from "../dto/request/request.dto";
import { validateRequestBody } from "../../../core/middlewares/validation.middleware";
import { authController } from "../di/dependency_injection";

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



export default router;
