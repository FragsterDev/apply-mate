import { PrismaClient, Job } from "@prisma/client";
import { CreateJobDto, UpdateJobDto } from "../../dto/request/request.dto";

export class JobRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createJob(data: CreateJobDto): Promise<Job> {
    return this.prisma.job.create({
      data: {
        title: data.title,
        company: data.company,
        status: data.status,
        appliedDate: data.appliedDate ? new Date(data.appliedDate) : new Date(),
        currentRound: data.currentRound ?? null,
        previousRounds: data.previousRounds,
        location: data.location ?? null,
        salary: data.salary ?? null,
        jobUrl: data.jobUrl ?? null,
        deadline: data.deadline ? new Date(data.deadline) : null,
        notes: data.notes ?? null,
        userId: data.userId,
      },
    });
  }

  async getJobById(id: string): Promise<Job | null> {
    return this.prisma.job.findUnique({
      where: { id },
    });
  }

  async getJobsByUser(
    userId: string,
    skip: number,
    take: number
  ): Promise<Job[]> {
    return this.prisma.job.findMany({
      where: { userId },
      skip,
      take,
      orderBy: { appliedDate: "desc" },
    });
  }

  async countJobsByUser(userId: string): Promise<number> {
    return this.prisma.job.count({ where: { userId } });
  }

  async updateJob(id: string, data: UpdateJobDto): Promise<Job> {
    return this.prisma.job.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.company !== undefined && { company: data.company }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.appliedDate !== undefined && {
          appliedDate: new Date(data.appliedDate),
        }),
        ...(data.currentRound !== undefined && {
          currentRound: data.currentRound,
        }),
        ...(data.previousRounds !== undefined && {
          previousRounds: data.previousRounds,
        }),
        ...(data.location !== undefined && { location: data.location }),
        ...(data.salary !== undefined && { salary: data.salary }),
        ...(data.jobUrl !== undefined && { jobUrl: data.jobUrl }),
        ...(data.deadline !== undefined && {
          deadline: new Date(data.deadline),
        }),
        ...(data.notes !== undefined && { notes: data.notes }),
      },
    });
  }

  async deleteJob(id: string): Promise<Job> {
    return this.prisma.job.delete({
      where: { id },
    });
  }
}
