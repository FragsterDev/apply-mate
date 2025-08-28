import AuthRepository from "../repository/auth.repository";
import { validatePassword } from "../../../utils/validation/password.validation";
import { isValidName } from "../../../utils/validation/username.validation";
import { isValidEmail } from "../../../utils/validation/email.validation";
import {
  comparePassword,
  hashPassword,
} from "../../../utils/password_hash/hash_password";
import { generateToken } from "../../../utils/jwt_token/jwt.utils";
import AppError from "../../../utils/AppError/AppError";

export class AuthService {
  private authRepository: AuthRepository;

  constructor(authRepo: AuthRepository) {
    this.authRepository = authRepo;
  }

  signUpUser = async (name: string, email: string, password: string) => {
    const existingUser = await this.authRepository.findUserByEmail(email);

    if (existingUser) {
      throw new AppError("User Already Exists", 400);
    }

    const passwordValidation = validatePassword(password);

    if (!passwordValidation.isValid) {
      throw new AppError(
        `Invalid Password: ${passwordValidation.errors.join(", ")}`,
        400
      );
    }

    if (!isValidName(name)) {
      throw new AppError("Invalid Name Format", 400);
    }

    if (!isValidEmail(email)) {
      throw new AppError("Invalid Email", 400);
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await this.authRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    //removing password from response
    const { password: _, ...registeredUser } = newUser;

    const jwtPayload = {
      id: registeredUser.id,
      name: registeredUser.name,
      email: registeredUser.email,
      role: registeredUser.role,
    };

    const jwtToken = generateToken(jwtPayload);

    return {
      registeredUser,
      jwtToken,
    };
  };

  loginUser = async (email: string, password: string) => {
    if (!isValidEmail(email)) {
      throw new AppError("Invalid Email or Password", 400);
    }

    //check if user exists
    const user = await this.authRepository.findUserByEmail(email);

    //throw error if user doesn't exist
    if (!user) {
      throw new AppError("Invalid Email or Password", 401);
    }

    //verify the password
    const isPasswordVerified = await comparePassword(password, user.password);

    if (!isPasswordVerified) {
      throw new AppError("Invalid Email or Password", 401);
    }

    //generate jwt token
    const jwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const jwtToken = generateToken(jwtPayload);

    //remove password from the data to be sent
    const { password: _, ...loggedInUser } = user;

    //return user data and jwt token
    return {
      loggedInUser,
      jwtToken,
    };
  };
}
