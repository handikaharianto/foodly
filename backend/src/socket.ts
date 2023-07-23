import { Socket } from "socket.io";

import { Chat, NewMessage } from "./chat/types";
import { NewNotification } from "./notification/types";
import NotificationController from "./notification/notification.controller";
import NotificationService from "./notification/notification.service";
import { io } from "../src";
import { UserRole, UserWithoutPassword } from "./user/types";

export const SOCKET_CONNECTED = "connection";
export const SOCKET_DISCONNECTED = "disconnect";
export const SEND_CHAT_MESSAGE = "send_chat_message";
export const CREATE_CHAT_WITH_MESSAGE = "create_chat_with_messgae";
export const USER_ONLINE = "user_online";
export const USER_OFFLINE = "user_offline";
export const NOTIFICATION = "notification";
export const ADMIN_ROOM = "admin_room";

const notificationController = new NotificationController(
  new NotificationService()
);

const users: { [key: string]: string } = {};
const connectSocket = (socket: Socket) => {
  // receive new message
  socket.on(SEND_CHAT_MESSAGE, (message: NewMessage) => {
    socket.broadcast.emit(SEND_CHAT_MESSAGE, message);
  });

  socket.on(CREATE_CHAT_WITH_MESSAGE, (chat: Chat, userId: string) => {
    io.to(users[userId]).emit(CREATE_CHAT_WITH_MESSAGE, chat);
  });

  // user online
  socket.on(USER_ONLINE, ({ userId, userRole }) => {
    users[userId] = socket.id;

    if (userRole === UserRole.ADMINISTRATOR) {
      socket.join(ADMIN_ROOM);
    }
    socket.broadcast.emit(USER_ONLINE, users);
  });

  // user offline
  socket.on(USER_OFFLINE, (userId: string) => {
    delete users[userId];
  });

  // user disconnected
  socket.on(SOCKET_DISCONNECTED, (userId: string) => {
    delete users[userId];
  });

  socket.on(NOTIFICATION, async (notification: NewNotification) => {
    try {
      const newNotification = await notificationController.createNotification(
        notification
      );

      if (newNotification) {
        const receiver = newNotification.receiver as UserWithoutPassword;
        if (receiver) {
          io.to(users[receiver._id]).emit(NOTIFICATION, newNotification);
          return;
        }
        io.to(ADMIN_ROOM).emit(NOTIFICATION, newNotification);
      }
    } catch (error) {
      console.error(error);
    }
  });
};

export default connectSocket;
