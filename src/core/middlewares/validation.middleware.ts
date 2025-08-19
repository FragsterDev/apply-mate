//middleware to validate the request body schema using built in parse function in Zod

import * as z from "zod";
import { Request, Response, NextFunction } from "express";
import { error } from "../../utils/responses/responses";

//to be used if the data is sent in body
export const validateRequestBody = (schema: z.ZodObject<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);//validation using zod parse function
      next();
    } catch (err) {
      res.status(400).json(error(400, "Zod Error: Invalid Request Body"));
    }
  };
};

//for validating request params
export const validateParams =
  (schema: z.ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // validate req.params against schema
      schema.parse(req.params);
      next();
    } catch (err) {
      return res
        .status(400)
        .json(error(400, "Zod Error: Invalid request params"));
    }
  };
