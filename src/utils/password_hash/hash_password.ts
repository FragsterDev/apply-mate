import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

//hashes a plain password
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

//compares a plain password with hashed password
export const comparePassword = async (password: string, hashed: string) => {
  return await bcrypt.compare(password, hashed);
};
