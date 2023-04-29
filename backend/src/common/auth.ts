import bcrypt from "bcrypt";

export const hashPassword = (plainTextPassword: string) =>
  bcrypt.hash(plainTextPassword, 10);

export const comparePassword = (
  plainTextPassword: string,
  hashedPassword: string
) => bcrypt.compare(plainTextPassword, hashedPassword);
