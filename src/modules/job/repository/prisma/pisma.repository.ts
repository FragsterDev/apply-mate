import { PrismaClient, Job } from "@prisma/client";
import { NewJobRequest } from "../../dto/request/request.dto";

const prisma = new PrismaClient();

export class JobRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async createJob(data: NewJobRequest): Promise<Job> {
    return prisma.job.create({
      data: {
        title: data.title,
        company: data.company,
        appliedDate: new Date(data.appliedDate), // convert to Date
        userId: data.userId,
        notes: data.notes ?? null, // ✅ convert undefined → null
      },
    });
  }

  async getJobById(id: string): Promise<Job | null> {
    return prisma.job.findUnique({
      where: { id },
    });
  }

  async getJobsByUser(userId: string): Promise<Job[]> {
    return prisma.job.findMany({
      where: { userId },
    });
  }

  async updateJob(id: string, data: Partial<NewJobRequest>): Promise<Job> {
    return prisma.job.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.company && { company: data.company }),
        ...(data.appliedDate && { appliedDate: new Date(data.appliedDate) }),
        ...(data.notes !== undefined && { notes: data.notes ?? null }),
      },
    });
  }

  async deleteJob(id: string): Promise<Job> {
    return prisma.job.delete({
      where: { id },
    });
  }
}
