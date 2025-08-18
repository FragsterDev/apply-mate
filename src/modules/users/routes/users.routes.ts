import { Router } from "express";
import { createUser } from "../controller/users.controller";
import validateRequestBody from "../../../core/middlewares/validation.middleware";
import { createUserSchema } from "../dto/request.dto";

const router = Router();

//public routes
router.post("/user", validateRequestBody(createUserSchema), createUser);

export default router;
