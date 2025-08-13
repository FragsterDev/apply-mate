import { Router } from "express";
import { createUser } from "../controller/users.controller";

const router = Router();

//public routes
router.post("/user", createUser);

export default router;
