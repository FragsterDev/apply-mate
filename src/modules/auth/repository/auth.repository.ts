// src/repository/auth.repository.ts
import { PrismaClient } from "@prisma/client";

class AuthRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createUser(data: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }) {
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role || "USER",
      },
    });
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async updateUser(
    id: string,
    data: Partial<{ name: string; email: string; password: string }>
  ) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}

export default AuthRepository;
