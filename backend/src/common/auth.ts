import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "config";
import crypto from "crypto";

const JWT_SECRET_KEY = config.get<string>("jwtSecretKey");

const SALT_ROUNDS = 10;
const ACCESS_TOKEN_EXPIRATION_TIME = 1 * 15 * 60; // 15 mins
export const REFRESH_TOKEN_EXPIRATION_TIME = 1 * 24 * 60 * 60; // 1 day

export const hashPassword = (plainTextPassword: string): Promise<string> =>
  bcrypt.hash(plainTextPassword, SALT_ROUNDS);

export const comparePassword = (
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> => bcrypt.compare(plainTextPassword, hashedPassword);

export const generateAccessToken = <T extends object>(user: T): string =>
  jwt.sign(user, JWT_SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRATION_TIME });

export const generateRefreshToken = (): string =>
  crypto.randomBytes(64).toString("base64");

export const verifyAccessToken = <T extends object>(token: string): T =>
  jwt.verify(token, JWT_SECRET_KEY) as T;
