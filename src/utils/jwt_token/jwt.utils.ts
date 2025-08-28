import jwt from "jsonwebtoken";
import AppError from "../AppError/AppError";

const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = "7d";

if (!JWT_SECRET) {
  throw new AppError("Internal Server Error: JWT Secret Not Found", 500);
}

export interface JwtPayLoad {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export const generateToken = (payload: JwtPayLoad): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: EXPIRES_IN,
  });
};

export const verifyToken = (token: string): JwtPayLoad => {
  return jwt.verify(token, JWT_SECRET) as JwtPayLoad;
};
