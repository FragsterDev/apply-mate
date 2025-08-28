import { Request, Response, NextFunction } from "express";
import { error } from "../../utils/responses/responses";
import { ZodError } from "zod";
import AppError from "../../utils/AppError/AppError";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("An error occured: ", err);

  let message = err.message || "Internal server error";
  let status = err.statusCode || 500;

  //check if its request schema error
  if (err instanceof ZodError) {
    status = 400;
    message = "Zod error: invalid request body";
  }

  //check if its our custom ApiError
  else if (err instanceof AppError) {
    status = err.statusCode;
    message = err.message;
  }

  //check if its any other error
  else if (err instanceof Error) {
    message = err.message;
  }

  res.status(status).json(error(status, message));
};

export default errorMiddleware;
