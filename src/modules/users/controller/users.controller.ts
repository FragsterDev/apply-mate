import { Request, Response, NextFunction } from "express";
import UserService from "../service/users.service";
import { success } from "../../../utils/responses/responses";

const userService = new UserService();

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const user = await userService.createUser(name, email, password);

    res.status(201).json(success("User Created Successfully", user, 201));
  } catch (err) {
    next(err);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params; //user id passed as param

    const user = await userService.getUserById(id!);

    res.status(200).json(success("User has been found", user, 200));
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedUser = await userService.updateUser(id!, { name });

    res.status(200).json(success("User has been found", updatedUser, 200));
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deletedUser = await userService.deleteUser(id!);

    res
      .status(200)
      .json(success("User deleted successfully", deletedUser, 200));
  } catch (err) {
    next(err);
  }
};
