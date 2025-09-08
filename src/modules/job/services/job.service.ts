import { CreateJobDto, UpdateJobDto } from "../dto/request/request.dto";
import { JobRepository } from "../repository/prisma/pisma.repository";
import { Job } from "@prisma/client";

/**
 * Service layer for Job-related operations.
 * Acts as a bridge between controllers and the repository.
 */
class JobService {
  private jobRepo: JobRepository;

  constructor(jobRepo: JobRepository) {
    this.jobRepo = jobRepo;
  }

  /**
   * Create a new Job entry.
   * @param newJobDto - Data transfer object containing job details
   * @returns The created Job
   */
  createNewJob = (newJobDto: CreateJobDto): Promise<Job> => {
    return this.jobRepo.createJob(newJobDto);
  };

  /**
   * Get a single Job by its ID.
   * @param id - Job ID
   * @returns The Job if found, otherwise null
   */
  getJobById = (id: string): Promise<Job | null> => {
    return this.jobRepo.getJobById(id);
  };

  /**
   * Get all Jobs belonging to a specific user.
   * @param userId - User ID
   * @returns Array of Jobs created by the user
   */
  getJobsByUser = (
    userId: string,
    skip: number,
    limit: number
  ): Promise<Job[]> => {
    return this.jobRepo.getJobsByUser(userId, skip, limit);
  };

  countJobsByUser = (userId: string) => {
    return this.jobRepo.countJobsByUser(userId);
  };

  /**
   * Update a Job by ID.
   * Only updates the provided fields (partial update).
   * @param id - Job ID
   * @param updateJobDto - Partial job details
   * @returns The updated Job
   */
  updateJobById = (id: string, updateJobDto: UpdateJobDto): Promise<Job> => {
    return this.jobRepo.updateJob(id, updateJobDto);
  };

  /**
   * Delete a Job by ID.
   * @param id - Job ID
   * @returns The deleted Job
   */
  deleteJobById = (id: string): Promise<Job> => {
    return this.jobRepo.deleteJob(id);
  };
}

export default JobService;
