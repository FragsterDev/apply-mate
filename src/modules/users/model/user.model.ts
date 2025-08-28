// src/models/user.model.ts
//user model same as declared in prisma

export interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
