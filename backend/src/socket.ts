import { Socket } from "socket.io";

import { NewMessage } from "./chat/types";
import { NewNotification } from "./notification/types";
import NotificationController from "./notification/notification.controller";
import NotificationService from "./notification/notification.service";
import { io } from "../src";
import { UserWithoutPassword } from "./user/types";

export const SOCKET_CONNECTED = "connection";
export const SOCKET_DISCONNECTED = "disconnect";
export const SEND_CHAT_MESSAGE = "send_chat_message";
export const USER_ONLINE = "user_online";
export const USER_OFFLINE = "user_offline";
export const NOTIFICATION = "notification";

const notificationController = new NotificationController(
  new NotificationService()
);

const users: { [key: string]: string } = {};
const connectSocket = (socket: Socket) => {
  console.log(`user connected ${socket.id}`);
  console.log(users);

  // receive new message
  socket.on(SEND_CHAT_MESSAGE, (message: NewMessage) => {
    console.log({ message });

    socket.broadcast.emit(SEND_CHAT_MESSAGE, message);
  });

  // user online
  socket.on(USER_ONLINE, ({ userId }) => {
    console.log(`user ${userId} is online`);
    users[userId] = socket.id;

    socket.broadcast.emit(USER_ONLINE, users);
  });

  // user offline
  socket.on(USER_OFFLINE, (userId: string) => {
    console.log(`user ${userId} is offline`);
    delete users[userId];
  });

  // user disconnected
  socket.on(SOCKET_DISCONNECTED, (userId: string) => {
    console.log(`${userId} disconnected`);
    delete users[userId];
  });

  socket.on(NOTIFICATION, async (notification: NewNotification) => {
    try {
      const newNotification = await notificationController.createNotification(
        notification
      );

      if (newNotification) {
        const receiver = newNotification.receiver as UserWithoutPassword;
        io.to(users[receiver._id]).emit(NOTIFICATION, newNotification);
      }
    } catch (error) {
      console.error(error);
    }
  });
};

export default connectSocket;
