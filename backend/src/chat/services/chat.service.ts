import ApiError from "../../common/api-error";
import chatModel from "../models/chat.model";
import { Chat } from "../types";
import HTTP_STATUS from "../../common/http-status-code";
import { CHAT_NOT_FOUND } from "../../common/error-message";

class ChatService {
  createChat = async (sender: string, receiver: string): Promise<void> => {
    const chat = await chatModel.create({
      sender,
      receiver,
    });
  };

  getAllChats = async (sender: string): Promise<Chat[]> => {
    const chats = await chatModel.find({ sender });
    return chats;
  };

  getOneChat = async (chatId: string): Promise<Chat> => {
    const chat = await chatModel.findById(chatId);
    if (!chat) throw new ApiError(HTTP_STATUS.NOT_FOUND_404, CHAT_NOT_FOUND);

    return chat;
  };
}

export default ChatService;
