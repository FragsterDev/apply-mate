import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { success } from "../../../utils/responses/responses";
import {
  validateResponse,
  authResponseDto,
  loginResponseDto,
  changePasswordResponseDto,
} from "../dto/response/response.dto";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  /**
   * Handles user registration/signup request
   * Validates input, creates user, and returns authentication response
   */
  signUpUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract user data from request body
      const { name, email, password } = req.body;

      // Call auth service to register new user
      const { registeredUser, jwtToken } = await this.authService.signUpUser(
        name,
        email,
        password
      );

      // Prepare authentication response object
      const authResponse = {
        userData: {
          id: registeredUser.id,
          name: registeredUser.name,
          email: registeredUser.email,
          role: registeredUser.role,
          createdAt: registeredUser.createdAt.toISOString(), // Convert Date to ISO string
          updatedAt: registeredUser.updatedAt.toISOString(), // Convert Date to ISO string
        },
        jwtToken: jwtToken,
      };

      // Validate response against schema (throws error if invalid)
      validateResponse(authResponse, authResponseDto);

      // Return successful response with authentication data
      await res
        .status(201) // Use 201 for resource creation
        .json(success("User created successfully", authResponse, 201));
    } catch (error) {
      // Pass any errors to the error handling middleware
      next(error);
    }
  };

  logInUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { loggedInUser, jwtToken } = await this.authService.loginUser(
        email,
        password
      );
      const loginResponse = {
        userData: {
          id: loggedInUser.id,
          name: loggedInUser.name,
          email: loggedInUser.email,
          role: loggedInUser.role,
          createdAt: loggedInUser.createdAt.toISOString(), // Convert Date to ISO string
          updatedAt: loggedInUser.updatedAt.toISOString(), // Convert Date to ISO string
        },
        jwtToken: jwtToken,
      };

      //validate response against schema
      validateResponse(loginResponse, loginResponseDto);

      res.status(200).json(success("Login Successful", loginResponse, 200));
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body;

      const { password: _, ...updatedUser } =
        await this.authService.changePassword(
          req.user!.id,
          oldPassword,
          newPassword
        );

      validateResponse(updatedUser, changePasswordResponseDto);

      res
        .status(201)
        .json(success("Password Updated Successfully", updatedUser, 200));
    } catch (error) {
      next(error);
    }
  };
}
