import { Socket } from "socket.io";

import { NewMessage } from "./chat/types";

export const SOCKET_CONNECTED = "connection";
export const SOCKET_DISCONNECTED = "disconnect";
export const SEND_CHAT_MESSAGE = "send_chat_message";
export const USER_ONLINE = "user_online";
export const USER_OFFLINE = "user_offline";

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
    users[socket.id] = userId;

    socket.broadcast.emit(USER_ONLINE, users);
  });

  // user offline
  socket.on(USER_OFFLINE, () => {
    console.log(`user ${users[socket.id]} is offline`);
    delete users[socket.id];
  });

  // user disconnected
  socket.on(SOCKET_DISCONNECTED, () => {
    console.log(`${socket.id} disconnected`);
    delete users[socket.id];
  });
};

export default connectSocket;
