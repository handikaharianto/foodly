import ApiError from "../../common/api-error";
import chatModel from "../models/chat.model";
import { Chat } from "../types";
import HTTP_STATUS from "../../common/http-status-code";
import { CHAT_EXISTS_ERROR, CHAT_NOT_FOUND } from "../../common/error-message";
import { Message } from "../../chat/types/index";
import { UserWithoutPassword } from "src/user/types";

class ChatService {
  createChat = async (users: string[]): Promise<void> => {
    const chat = await chatModel.find({
      users: { $all: users },
    });
    if (chat) throw new ApiError(HTTP_STATUS.CONFLICT_409, CHAT_EXISTS_ERROR);

    await chatModel.create({
      users,
    });
  };

  getAllChats = async (userId: string): Promise<Chat[]> => {
    const chats = await chatModel
      .find({
        users: { $in: [userId] },
      })
      .populate<{ latestMessage: Message }>({ path: "latestMessage" })
      .populate<{ users: UserWithoutPassword[] }>({
        path: "users",
        select: "-password",
      });

    return chats;
  };

  getOneChat = async (chatId: string): Promise<Chat> => {
    const chat = await chatModel.findById(chatId);
    if (!chat) throw new ApiError(HTTP_STATUS.NOT_FOUND_404, CHAT_NOT_FOUND);

    return chat;
  };
}

export default ChatService;
