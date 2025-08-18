import { Request, Response, NextFunction } from "express";
import { success, error } from "../../../utils/responses/responses";

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ message: "Route was hit" });
  } catch (err) {
    next(err);
  }
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ message: "Route was hit" });
  } catch (err) {
    next(err);
  }
};
