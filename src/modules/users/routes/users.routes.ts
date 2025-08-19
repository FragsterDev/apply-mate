import { Router } from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controller/users.controller";
import {
  createUserSchema,
  userIdSchema,
  updateUserSchema,
} from "../dto/request/request.dto";
import {
  validateParams,
  validateRequestBody,
} from "../../../core/middlewares/validation.middleware";

const router = Router();

//public routes
router.post("/user", validateRequestBody(createUserSchema), createUser);

//private routes
router.get("/user/:id", validateParams(userIdSchema), getUser); //get user by id

router.put(
  "/user/:id",
  validateParams(userIdSchema),
  validateRequestBody(updateUserSchema),
  updateUser
); //update user name

router.delete("/user/:id", validateParams(userIdSchema), deleteUser); //delete user by id

export default router;
