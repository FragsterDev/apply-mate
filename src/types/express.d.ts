import { JwtPayLoad } from "../utils/jwt_token/jwt.utils";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayLoad;
    }
  }
}
