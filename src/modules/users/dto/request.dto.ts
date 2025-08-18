//this stores the schema for various requests

import * as z from "zod";

export const createUserSchema: z.ZodObject = z.object({
  userName: z.string(),
  email: z.string(),
  password: z.string(),
});
