import { NextFunction, Request, Response } from "express";
import ChatService from "../services/chat.service";
import HTTP_STATUS from "../../common/http-status-code";

class ChatController {
  private readonly _chatService;

  constructor(_chatService: ChatService) {
    this._chatService = _chatService;
  }

  createChat = async (req: Request, res: Response, next: NextFunction) => {
    const { _id: sender } = req.user;
    const { receiver } = req.body;

    try {
      await this._chatService.createChat(sender, receiver);
      res.sendStatus(HTTP_STATUS.CREATED_201);
    } catch (error: any) {
      next(error);
    }
  };

  getAllChats = async (req: Request, res: Response, next: NextFunction) => {
    const { sender } = req.body;

    try {
      const data = await this._chatService.getAllChats(sender);
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error: any) {
      next(error);
    }
  };

  getOneChat = async (req: Request, res: Response, next: NextFunction) => {
    const { chatId } = req.params;

    try {
      const data = await this._chatService.getAllChats(chatId);
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error: any) {
      next(error);
    }
  };
}

export default ChatController;
