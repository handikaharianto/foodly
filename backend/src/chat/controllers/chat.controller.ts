import { NextFunction, Request, Response } from "express";
import ChatService from "../services/chat.service";
import HTTP_STATUS from "../../common/http-status-code";
import { z } from "zod";

export const createChatSchema = z.object({
  users: z.array(z.string()).length(2),
});

export const getOneChatSchema = z.object({
  chatId: z.string().min(1, { message: "Chat ID is required." }),
});

class ChatController {
  private readonly _chatService;

  constructor(_chatService: ChatService) {
    this._chatService = _chatService;
  }

  createChat = async (req: Request, res: Response, next: NextFunction) => {
    const { users } = req.body;

    try {
      const data = await this._chatService.createChat(users);
      res.status(HTTP_STATUS.CREATED_201).json(data);
    } catch (error: any) {
      next(error);
    }
  };

  getAllChats = async (req: Request, res: Response, next: NextFunction) => {
    const { _id: userId } = req.user;

    try {
      const data = await this._chatService.getAllChats(userId);
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error: any) {
      next(error);
    }
  };

  getOneChat = async (req: Request, res: Response, next: NextFunction) => {
    const { chatId } = req.params;

    try {
      const data = await this._chatService.getOneChat(chatId);
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error: any) {
      next(error);
    }
  };
}

export default ChatController;
