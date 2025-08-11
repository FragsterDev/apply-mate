import { Router } from "express";
import  HealthController  from "./health.controller";

const router = Router();

router.use('/health', HealthController);

export default router;