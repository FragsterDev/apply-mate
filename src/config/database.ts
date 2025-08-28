// src/config/database.ts
import { PrismaClient } from "@prisma/client";

//this prisma client instance will be used in repositories
export const prisma = new PrismaClient();
