import { Request, Response } from "express";
import { success, error } from "../../utils/responses/responses";

const health = (req: Request, res: Response) => {
  try {
    res.status(200).json(success("Server is Running", {}, 201));
  } catch (err) {
    res.status(501).json(error(501, "Internal server error"));
  }
};

export default health;
