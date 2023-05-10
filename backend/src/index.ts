import express, { json, urlencoded } from "express";
import http from "http";
import cors from "cors";
import config from "config";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./utils/connectDB";
import userRouter from "./user/user.route";
import handleError from "./common/middlewares/handle-error.middleware";

dotenv.config();

export const app = express();
export const server = http.createServer(app);

const PORT = config.get<string>("port");
const MONGO_DB_URI = config.get<string>("mongoUri");
const COOKIE_SECRET_KEY = config.get<string>("cookieSecretKey");

app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/users", userRouter);

// error handler
app.use(handleError);

const start = () => {
  try {
    server.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`);
    });
    connectDB(MONGO_DB_URI);
  } catch (error) {
    process.exit(1);
  }
};

start();
