import * as z from "zod";

/** CREATE JOB */
export const createJobSchema = z.object({
  title: z.string(),
  company: z.string(),
  appliedDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid Date Format",
  }),
  userId: z.string(),          // keep as plain string to match your current data
  notes: z.string().optional(), // undefined in input → we’ll convert to null in repo
});
export type CreateJobRequest = z.infer<typeof createJobSchema>;

/** UPDATE JOB (body only; id comes from route params) */
export const updateJobSchema = z.object({
  title: z.string().optional(),
  company: z.string().optional(),
  appliedDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid Date Format",
    })
    .optional(),
  notes: z.string().optional(),
  status: z.string().optional(), // free-form since you’re not using enums
});
export type UpdateJobRequest = z.infer<typeof updateJobSchema>;

/** ✅ Backward-compat exports so old imports keep working */
export const newJobRequestDto = createJobSchema;
export type NewJobRequest = CreateJobRequest;
