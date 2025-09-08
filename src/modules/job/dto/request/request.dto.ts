import { z } from "zod";

export const CreateJobDto = z.object({
  title: z.string(),
  company: z.string(),
  status: z.string(),
  appliedDate: z.coerce.date().optional(),
  currentRound: z.string().optional(),
  previousRounds: z.array(z.string()),
  location: z.string().optional(),
  salary: z.string().optional(),
  jobUrl: z.string().optional(),
  deadline: z.coerce.date().optional(),
  notes: z.string().optional(),
  userId: z.string(),
});

export const UpdateJobDto = CreateJobDto.partial();

export type CreateJobDto = z.infer<typeof CreateJobDto>;
export type UpdateJobDto = z.infer<typeof UpdateJobDto>;
