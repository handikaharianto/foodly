import { Socket } from "socket.io";

import { io } from "src";
import MessageController from "./chat/controllers/message.controller";
import MessageService from "./chat/services/message.service";

export const SEND_CHAT_MESSAGE = "send_chat_message";

const messageController = new MessageController(new MessageService());

io.use((socket: Socket, next) => {
  console.log(socket);
  console.log(next);
});

io.on("connection", (socket: Socket) => {
  // receive new message
  socket.on(SEND_CHAT_MESSAGE, messageController.createMessage);
});
