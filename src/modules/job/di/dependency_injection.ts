// dependency_injection.ts (inside jobs/di)

import { prisma } from "../../../config/database";
import JobController from "../controller/job.controller";
import { JobRepository } from "../repository/prisma/pisma.repository";
import JobService from "../services/job.service";

const jobRepository = new JobRepository(prisma); // job repository
const jobService = new JobService(jobRepository); // job service
const jobController = new JobController(jobService); // job controller

export { jobRepository, jobService, jobController };
