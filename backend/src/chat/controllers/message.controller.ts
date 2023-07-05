import { NextFunction, Request, Response } from "express";

import MessageService from "../services/message.service";
import HTTP_STATUS from "../../common/http-status-code";
import { z } from "zod";

export const getAllMessagesSchema = z.object({
  chatId: z.string().min(1, { message: "Chat ID is required." }),
});

export const getOneMessageSchema = z.object({
  chatId: z.string().min(1, { message: "Chat ID is required." }),
  messageId: z.string().min(1, { message: "Message ID is required." }),
});

class MessageController {
  private readonly _messageService;

  constructor(_messageService: MessageService) {
    this._messageService = _messageService;
  }

  createMessage = async (req: Request, res: Response, next: NextFunction) => {
    const { content, sender } = req.body;
    const { chatId: chat } = req.params;

    try {
      const data = await this._messageService.createMessage({
        content,
        sender,
        chat,
      });
      return res.status(HTTP_STATUS.CREATED_201).json(data);
    } catch (error: any) {
      next(error);
    }
  };

  getAllMessages = async (req: Request, res: Response, next: NextFunction) => {
    const { chatId } = req.params;

    try {
      const data = await this._messageService.getAllMessages(chatId);
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error: any) {
      next(error);
    }
  };

  getOneMessage = async (req: Request, res: Response, next: NextFunction) => {
    const { chatId, messageId } = req.params;

    try {
      const data = await this._messageService.getOneMessage(chatId, messageId);
      return res.status(HTTP_STATUS.OK_200).json(data);
    } catch (error: any) {
      next(error);
    }
  };
}

export default MessageController;
