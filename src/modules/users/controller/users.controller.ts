import { Request, Response, NextFunction } from "express";
import { success, error } from "../../../utils/responses/responses";

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err) {
    next(err);
  }
};
