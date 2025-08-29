import * as z from "zod";

//request schema for new user sign up
export const signUpSchema: z.ZodObject = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

//request schema for existing user login
export const loginSchema: z.ZodObject = z.object({
  email: z.string(),
  password: z.string(),
});

export const changePasswordSchema: z.ZodObject = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});
