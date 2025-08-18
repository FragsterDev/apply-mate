import { Request, Response, NextFunction } from "express";
import UserService from "../service/users.service";
import { success } from "../../../utils/responses/responses";

const userService = new UserService();

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    const user = await userService.createUser(name, email, password );

    res.status(201).json(success("User Created Successfully", user, 201));
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
