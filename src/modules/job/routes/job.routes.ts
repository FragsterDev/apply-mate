import { Router } from "express";
import { jobController } from "../di/dependency_injection";
import { authenticateUser } from "../../../core/middlewares/auth.middleware";
import {
  validateParams,
  validateRequestBody,
} from "../../../core/middlewares/validation.middleware";
import { CreateJobDto, UpdateJobDto } from "../dto/request/request.dto";

const router = Router();

router.post(
  "/job",
  authenticateUser,
  validateRequestBody(CreateJobDto),
  jobController.createNewJob
);

router.get("/job/:id", authenticateUser, jobController.getJobById);

router.get("/job", authenticateUser, jobController.getJobsByUser);

router.put(
  "/job/:id",
  authenticateUser,
  validateRequestBody(UpdateJobDto),
  jobController.updateJobById
);
router.delete("/job/:id", authenticateUser, jobController.deleteJobById);

export default router;
