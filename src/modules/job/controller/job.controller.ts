import { Request, Response, NextFunction } from "express";
import JobService from "../services/job.service";
import { NewJobRequest, newJobRequestDto } from "../dto/request/request.dto";

class JobController {
  private jobService: JobService;

  constructor(jobService: JobService) {
    this.jobService = jobService;
  }

  createJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ✅ Validate using Zod schema
      const data: NewJobRequest = newJobRequestDto.parse(req.body);

      const job = await this.jobService.createJob(data);
      res.status(201).json(job);
    } catch (err) {
      // If Zod throws validation error
      if (err instanceof Error && "issues" in err) {
        return res.status(400).json({ error: err });
      }
      next(err);
    }
  };

  getJobById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const job = await this.jobService.getJobById(req.params.id!);
      if (!job) return res.status(404).json({ message: "Job not found" });
      res.json(job);
    } catch (err) {
      next(err);
    }
  };

  getJobsByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobs = await this.jobService.getJobsByUser(req.params.userId!);
      res.json(jobs);
    } catch (err) {
      next(err);
    }
  };

  updateJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // You could also validate update input with a separate DTO
      const job = await this.jobService.updateJob(req.params.id!, req.body);
      res.json(job);
    } catch (err) {
      next(err);
    }
  };

  deleteJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.jobService.deleteJob(req.params.id!);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}

export default JobController;
