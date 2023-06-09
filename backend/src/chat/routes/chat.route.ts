import { Router } from "express";
import ChatController from "../controllers/chat.controller";
import ChatService from "../services/chat.service";
import verifyJWT from "../../common/middlewares/verify-access-token.middleware";
import authorizeUser from "../../common/middlewares/authorize-user";
import { UserRole } from "../../user/types";
import MessageController from "../controllers/message.controller";
import MessageService from "../services/message.service";

const chatController = new ChatController(new ChatService());
const messageController = new MessageController(new MessageService());

const chatRouter = Router();

chatRouter
  .route("/")
  .post(
    verifyJWT,
    authorizeUser(UserRole.PUBLIC, UserRole.COMMUNITY),
    chatController.createChat
  );

chatRouter
  .route("/list")
  .post(
    verifyJWT,
    authorizeUser(UserRole.PUBLIC, UserRole.COMMUNITY),
    chatController.getAllChats
  );

chatRouter
  .route("/:chatId")
  .get(
    verifyJWT,
    authorizeUser(UserRole.PUBLIC, UserRole.COMMUNITY),
    chatController.getOneChat
  );

chatRouter
  .route("/:chatId/messages/list")
  .post(
    verifyJWT,
    authorizeUser(UserRole.PUBLIC, UserRole.COMMUNITY),
    messageController.getAllMessages
  );

chatRouter
  .route("/:chatId/messages/:messageId")
  .get(
    verifyJWT,
    authorizeUser(UserRole.PUBLIC, UserRole.COMMUNITY),
    messageController.getOneMessage
  );

export default chatRouter;
