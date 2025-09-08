import { z } from "zod";

export const JobResponseDto = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  status: z.string(),
  appliedDate: z.coerce.date(),
  lastModifiedDate: z.coerce.date(),
  currentRound: z.string().nullable(),
  previousRounds: z.array(z.string()),
  location: z.string().nullable(),
  salary: z.string().nullable(),
  jobUrl: z.string().nullable(),
  deadline: z.coerce.date().nullable(),
  notes: z.string().nullable(),
  userId: z.string(),
});

export type JobResponseDto = z.infer<typeof JobResponseDto>;
