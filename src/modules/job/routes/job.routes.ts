import { Router } from "express";

import { validateRequestBody } from "../../../core/middlewares/validation.middleware";
import { jobController } from "../di/dependency_injection";
import { authenticateUser } from "../../../core/middlewares/auth.middleware";
import { createJobSchema, updateJobSchema } from "../dto/request/request.dto";

// ✅ Import request schemas


const router = Router();

// create new job
router.post(
  "/jobs",
  authenticateUser,
  validateRequestBody(createJobSchema),
  jobController.createJob
);

// get job by id
router.get("/jobs/:id", authenticateUser, jobController.getJobById);

// update job
router.put(
  "/jobs/:id",
  authenticateUser,
  validateRequestBody(updateJobSchema),
  jobController.updateJob
);

// delete job
router.delete("/jobs/:id", authenticateUser, jobController.deleteJob);

export default router;
