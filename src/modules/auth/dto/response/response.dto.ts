//validation schema for responses

import * as z from "zod";

export const authResponseDto = z.object({
  userData: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  jwtToken: z.string(),
});

export const loginResponseDto = z.object({
  userData: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  jwtToken: z.string(),
});

export const changePasswordResponseDto = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

//utility function to validate response
export const validateResponse = <T extends z.ZodTypeAny>(
  data: unknown,
  schema: T
): z.infer<T> => {
  return schema.parse(data);
};
