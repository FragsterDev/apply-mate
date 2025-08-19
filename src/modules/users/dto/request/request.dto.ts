//this stores the schema for various requests

import * as z from "zod";

export const createUserSchema: z.ZodObject = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

//schema to validate user id
export const userIdSchema: z.ZodObject = z.object({
  id: z.string().uuid(),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
});
