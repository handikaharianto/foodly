import dotenv from "dotenv";

dotenv.config();

export default {
  port: 8000,
  mongoUri: process.env.MONGO_DB_URI,
};
dotenv.config();
