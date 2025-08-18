import { NextFunction, Request, Response } from "express";
import { success, error } from "../../utils/responses/responses";

const health = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(success("Server is Running", {}, 201));
  } catch (err) {
    next(err);
  }
};

export default health;
