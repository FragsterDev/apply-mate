// dependency injection

import { prisma } from "../../../config/database";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../services/auth.service";
import AuthRepository from "../repository/auth.repository";

const authRepository = new AuthRepository(prisma); //auth repository
const authService = new AuthService(authRepository); //auth service
const authController = new AuthController(authService); //auth service

export { authRepository, authController, authService };
