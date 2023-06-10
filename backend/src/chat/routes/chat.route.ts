import { Router } from "express";
import ChatController, {
  createChatSchema,
  getOneChatSchema,
} from "../controllers/chat.controller";
import ChatService from "../services/chat.service";
import verifyJWT from "../../common/middlewares/verify-access-token.middleware";
import authorizeUser from "../../common/middlewares/authorize-user";
import { UserRole } from "../../user/types";
import MessageController, {
  getAllMessagesSchema,
  getOneMessageSchema,
} from "../controllers/message.controller";
import MessageService from "../services/message.service";
import {
  validateRequestBody,
  validateRequestParams,
} from "zod-express-middleware";

const chatController = new ChatController(new ChatService());
const messageController = new MessageController(new MessageService());

const chatRouter = Router();

chatRouter
  .route("/")
  .post(
    verifyJWT,
    authorizeUser(UserRole.ADMINISTRATOR, UserRole.PUBLIC, UserRole.COMMUNITY),
    validateRequestBody(createChatSchema),
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
    validateRequestParams(getOneChatSchema),
    chatController.getOneChat
  );

chatRouter
  .route("/:chatId/messages/list")
  .post(
    verifyJWT,
    authorizeUser(UserRole.PUBLIC, UserRole.COMMUNITY),
    validateRequestBody(getAllMessagesSchema),
    messageController.getAllMessages
  );

chatRouter
  .route("/:chatId/messages/:messageId")
  .get(
    verifyJWT,
    authorizeUser(UserRole.PUBLIC, UserRole.COMMUNITY),
    validateRequestParams(getOneMessageSchema),
    messageController.getOneMessage
  );

export default chatRouter;
