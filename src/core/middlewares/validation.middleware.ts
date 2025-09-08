import * as z from "zod";
import { Request, Response, NextFunction } from "express";
import { error } from "../../utils/responses/responses";

// to be used if the data is sent in body
export const validateRequestBody = (schema: z.ZodObject<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body); // validation using zod parse function
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = err.issues.map((e) => ({
          path: e.path.join("."), // which field failed
          message: e.message, // error message
        }));

        return res
          .status(400)
          .json(error(400, "Validation Failed", formattedErrors));
      }

      return res.status(500).json(error(500, "Internal Server Error"));
    }
  };
};

// for validating request params
export const validateParams = (schema: z.ZodObject<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = err.issues.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        }));

        return res
          .status(400)
          .json(error(400, "Validation Failed", formattedErrors));
      }

      return res.status(500).json(error(500, "Internal Server Error"));
    }
  };
};
