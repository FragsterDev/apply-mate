// src/repository/users.repository.ts
import { PrismaClient } from "@prisma/client";
import { UserResponseDto } from "../dto/response/response.dto";

const prisma = new PrismaClient();

class UserRepository {
  async createUser(data: { name: string; email: string; password: string }) {
    // TypeScript will infer return type automatically
    return prisma.user.create({
      data: data,
      select: UserResponseDto,
    });
  }

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: UserResponseDto,
    });
  }

  async getAllUsers() {
    return prisma.user.findMany();
  }

  async updateUser(
    id: string,
    data: Partial<{ name: string; email: string; password: string }>
  ) {
    return prisma.user.update({
      where: { id },
      select: UserResponseDto,
      data,
    });
  }

  async deleteUser(id: string) {
    return prisma.user.delete({
      where: { id },
      select: UserResponseDto,
    });
  }
}

export default UserRepository;
