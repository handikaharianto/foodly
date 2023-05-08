import dotenv from "dotenv";

dotenv.config();

export default {
  port: 8000,
  mongoUri: process.env.MONGO_DB_URI,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  cookieSecretKey: process.env.COOKIE_SECRET_KEY,
};
dotenv.config();
