import { Request, Response, NextFunction } from "express";
import { CreateJobDto, UpdateJobDto } from "../dto/request/request.dto";
import AppError from "../../../utils/AppError/AppError";
import JobService from "../services/job.service";
import { JobResponseDto } from "../dto/response/response.dto";
import { success } from "../../../utils/responses/responses";
import { Job } from "@prisma/client";

class JobController {
  private jobService: JobService;

  constructor(jobService: JobService) {
    this.jobService = jobService;
  }

  // ✅ Create a new job
  createNewJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new AppError("Unauthorized User", 401);

      const parsedData: CreateJobDto = CreateJobDto.parse(req.body);

      if (req.user.id !== parsedData.userId) {
        throw new AppError("Unauthorized User", 401);
      }

      const createdJob = await this.jobService.createNewJob(parsedData);
      const jobResponse: JobResponseDto = JobResponseDto.parse(createdJob);

      res
        .status(200)
        .json(success("New Job Created Successfully", jobResponse, 200));
    } catch (error) {
      next(error);
    }
  };

  // ✅ Get job by ID
  getJobById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new AppError("Unauthorized Access", 401);

      const id = req.params.id;
      if (!id) throw new AppError("Invalid Params", 400);

      const job: Job | null = await this.jobService.getJobById(id);
      if (!job) throw new AppError("Resource not found", 404);

      if (job.userId !== req.user.id)
        throw new AppError("Unauthorized Access", 403);

      const jobResponse: JobResponseDto = JobResponseDto.parse(job);
      res.status(200).json(success("Job Found", jobResponse, 200));
    } catch (error) {
      next(error);
    }
  };

  // ✅ Get all jobs by the logged-in user
  getJobsByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new AppError("Unauthorized Access", 401);

      const page = parseInt(req.params.page!) | 1;
      const limit = parseInt(req.params.limit!) | 10;
      const skip = (page - 1) * limit;

      const jobs: Job[] = await this.jobService.getJobsByUser(
        req.user.id,
        skip,
        limit
      );

      const total = await this.jobService.countJobsByUser(req.user.id);

      const jobResponses: JobResponseDto[] = jobs.map((job) =>
        JobResponseDto.parse(job)
      );

      res
        .status(200)
        .json(
          success(
            "Jobs Retrieved Successfully",
            jobResponses,
            200,
            page,
            limit,
            total
          )
        );
    } catch (error) {
      next(error);
    }
  };

  // ✅ Update job by ID
  updateJobById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new AppError("Unauthorized Access", 401);

      const id = req.params.id;
      if (!id) throw new AppError("Invalid Params", 400);

      const parsedData: UpdateJobDto = UpdateJobDto.parse(req.body);

      const job = await this.jobService.getJobById(id);
      if (!job) throw new AppError("Resource not found", 404);

      if (job.userId !== req.user.id)
        throw new AppError("Unauthorized Access", 403);

      const updatedJob = await this.jobService.updateJobById(id, parsedData);
      const jobResponse: JobResponseDto = JobResponseDto.parse(updatedJob);

      res
        .status(200)
        .json(success("Job Updated Successfully", jobResponse, 200));
    } catch (error) {
      next(error);
    }
  };

  // ✅ Delete job by ID
  deleteJobById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new AppError("Unauthorized Access", 401);

      const id = req.params.id;
      if (!id) throw new AppError("Invalid Params", 400);

      const job = await this.jobService.getJobById(id);
      if (!job) throw new AppError("Resource not found", 404);

      if (job.userId !== req.user.id)
        throw new AppError("Unauthorized Access", 403);

      await this.jobService.deleteJobById(id);

      res.status(200).json(success("Job Deleted Successfully", null, 200));
    } catch (error) {
      next(error);
    }
  };
}

export default JobController;
