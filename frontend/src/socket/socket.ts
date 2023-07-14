import { io } from "socket.io-client";

export const SOCKET_CONNECTED = "connection";
export const SOCKET_DISCONNECTED = "disconnect";
export const SEND_CHAT_MESSAGE = "send_chat_message";
export const USER_ONLINE = "user_online";
export const USER_OFFLINE = "user_offline";
export const NOTIFICATION = "notification";
export const ADMIN_ROOM = "admin_room";

export const socket = io("http://localhost:8000", {
  autoConnect: false,
});
