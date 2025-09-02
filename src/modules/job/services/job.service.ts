import { NewJobRequest } from "../dto/request/request.dto";
import { JobRepository } from "../repository/prisma/pisma.repository";


class JobService {
  private jobRepository: JobRepository;

  constructor(jobRepository: JobRepository) {
    this.jobRepository = jobRepository;
  }

  async createJob(data: NewJobRequest) {
    return this.jobRepository.createJob(data);
  }

  async getJobById(id: string) {
    return this.jobRepository.getJobById(id);
  }

  async getJobsByUser(userId: string) {
    return this.jobRepository.getJobsByUser(userId);
  }

  async updateJob(
    id: string,
    data: Partial<Omit<NewJobRequest, "userId">>
  ) {
    return this.jobRepository.updateJob(id, data);
  }

  async deleteJob(id: string) {
    return this.jobRepository.deleteJob(id);
  }
}

export default JobService;
