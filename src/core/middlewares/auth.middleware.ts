//middleware for authorization and authentication

import { Request, Response, NextFunction } from "express";
import AppError from "../../utils/AppError/AppError";
import { verifyToken } from "../../utils/jwt_token/jwt.utils";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //extract the authorization header
    const authHeader = req.headers.authorization;

    //check if auth header exists
    if (!authHeader) {
      throw new AppError("Authorization header is required", 401);
    }

    // split the header into bearer and the token
    const parts = authHeader.split(" ");

    //check if the header has the correct format Bearer <token>
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      throw new AppError("Invalid authorization format", 401);
    }

    //extract the token
    const token = parts[1];

    if (!token) {
      throw new AppError("Authentication Token is required", 401);
    }

    //verify the token
    const decoded = verifyToken(token);

    //attach the payload with the request object as user
    req.user = decoded;

    //continue to the next middleware
    next();
  } catch (error) {
    next(error);
  }
};
