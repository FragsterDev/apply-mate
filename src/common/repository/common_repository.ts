//common repository module
import { PrismaClient } from "@prisma/client";

class CommonRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  getUserById = (id: string) => {
    return this.prisma.user.findUnique({ where: { id } });
  };
}

export default CommonRepository;
