import express, { json, urlencoded } from "express";
import http from "http";
import cors from "cors";
import config from "config";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Server, Socket } from "socket.io";

import connectDB from "./utils/connectDB";
import userRouter from "./user/user.route";
import handleError from "./common/middlewares/handle-error.middleware";
import communityRouter from "./community/community.route";
import communityApplicationRouter from "./communityApplication/communityApplication.route";
import chatRouter from "./chat/routes/chat.route";
import connectSocket, { SOCKET_CONNECTED } from "./socket";
import donationRouter from "./donation/donation.route";
import dashboardRouter from "./dashboard/dashboard.route";
import notificationRouter from "./notification/notification.route";

dotenv.config();

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "https://foodly-app.onrender.com",
    ],
  },
});

const PORT = config.get<string>("port");
const MONGO_DB_URI = config.get<string>("mongoUri");

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "https://foodly-app.onrender.com",
    ],
    // credentials: true,`
  })
);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/users", userRouter);
app.use("/api/communities", communityRouter);
app.use("/api/community-applications", communityApplicationRouter);
app.use("/api/chats", chatRouter);
app.use("/api/donations", donationRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/notifications", notificationRouter);

// error handler
app.use(handleError);

// socket.io
io.on(SOCKET_CONNECTED, connectSocket);

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
