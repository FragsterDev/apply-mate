//this stores the schema for various requests

import * as z from "zod";

export const getUserSchema: z.ZodObject = z.object({
  userName: z.string(),
});
