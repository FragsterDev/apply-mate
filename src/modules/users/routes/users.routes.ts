import { Router } from "express";
import { createUser } from "../controller/users.controller";
import { getUser } from "../controller/users.controller";
import { getUserSchema } from "../dto/request.dto";
import validateRequestBody from "../../../core/middlewares/validation.middleware";

const router = Router();

//public routes
router.post("/user", createUser);

export default router;
