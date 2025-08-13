import { Request, Response, NextFunction } from "express";
import { error } from "../../utils/responses/responses";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("An error occured: ", err);

  const message = err.message || "Internal server error";
  const status = err.statusCode || 500;

  res.status(status).json(error(status, message));
};

export default errorMiddleware;
