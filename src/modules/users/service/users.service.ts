import { hashPassword } from "../../../utils/password_hash/hash_password";
import { isValidEmail } from "../../../utils/validation/email.validation";
import { isValidName } from "../../../utils/validation/username.validation";
import UserRepository from "../repository/users.repository";

class UserService {
  private userRepo = new UserRepository();

  async createUser(name: string, email: string, password: string) {
    // Check if user already exists
    const existingUser = await this.userRepo.findUserByEmail(email);

    if (existingUser) {
      throw new AppError("User with this email already exists", 400);
    }

    //hashing the password provided by user
    const hashedPassword = await hashPassword(password);

    //email syntax validation
    if (!isValidEmail(email)) {
      throw new AppError("Invalid email", 400);
    }

    //user name validation
    if (!isValidName(name)) {
      throw new AppError("Invalid Username", 400);
    }

    // Create new user (password is stored, but not returned because of Prisma select)
    const newUser = await this.userRepo.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return newUser;
  }

  async getUserById(id: string) {
    //check if user with this id exists
    const user = await this.userRepo.findUserById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    //return user if found
    return user;
  }

  async updateUser(id: string, data: Partial<{ name: string }>) {
    // Check if user exists
    const existingUser = await this.userRepo.findUserById(id);
    if (!existingUser) {
      throw new AppError("User not found", 404);
    }

    //validate fields
    if (data.name && !isValidName(data.name)) {
      throw new AppError("Invalid username", 400);
    }

    // Perform the update
    const updatedUser = await this.userRepo.updateUser(id, data);
    return updatedUser;
  }

  async deleteUser(id: string) {
    // Check if user exists
    const existingUser = await this.userRepo.findUserById(id);
    if (!existingUser) {
      throw new AppError("User not found", 404);
    }

    // Delete the user
    const deletedUser = await this.userRepo.deleteUser(id);
    return deletedUser;
  }
}

export default UserService;
