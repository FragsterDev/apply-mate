import * as z from "zod";

// Response DTO for a job
export const jobResponseDto = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  appliedDate: z.string(),
  status: z.string(), // since you didn’t want enum
  notes: z.string().nullable(), // nullable because db might allow null
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
});

// For returning a single job
export type JobResponse = z.infer<typeof jobResponseDto>;

// For returning an array of jobs
export const jobsListResponseDto = z.array(jobResponseDto);
export type JobsListResponse = z.infer<typeof jobsListResponseDto>;
