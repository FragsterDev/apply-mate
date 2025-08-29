//middleware for authorization and authentication

import { Request, Response, NextFunction } from "express";

export const authorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};
