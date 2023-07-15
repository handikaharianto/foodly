import ApiError from "../../common/api-error";
import chatModel from "../models/chat.model";
import { Chat } from "../types";
import HTTP_STATUS from "../../common/http-status-code";
import { CHAT_EXISTS_ERROR, CHAT_NOT_FOUND } from "../../common/error-message";
import { Message } from "../../chat/types/index";
import { UserWithoutPassword } from "src/user/types";

class ChatService {
  createChat = async (users: string[]): Promise<Chat> => {
    const chat = await chatModel
      .findOne({
        users: { $all: users },
      })
      .populate<{ latestMessage: Message }>({ path: "latestMessage" })
      .populate<{ users: UserWithoutPassword[] }>({
        path: "users",
        select: "-password",
      });
    if (chat) return chat;

    let newChat = await chatModel.create({
      users,
    });
    newChat = await newChat.populate<{ users: UserWithoutPassword[] }>({
      path: "users",
      select: "-password",
    });

    return newChat;
  };

  getAllChats = async (userId: string): Promise<Chat[]> => {
    const chats = await chatModel
      .find(
        {
          users: { $in: [userId] },
        },
        null,
        { sort: "-updatedAt" }
      )
      .populate<{ latestMessage: Message }>({ path: "latestMessage" })
      .populate<{ users: UserWithoutPassword[] }>({
        path: "users",
        select: "-password",
      });

    return chats;
  };

  getOneChat = async (chatId: string): Promise<Chat> => {
    const chat = await chatModel
      .findById(chatId)
      .populate<{ users: UserWithoutPassword[] }>({
        path: "users",
        select: "-password",
      })
      .populate<{ latestMessage: Message }>({ path: "latestMessage" });
    if (!chat) throw new ApiError(HTTP_STATUS.NOT_FOUND_404, CHAT_NOT_FOUND);

    return chat;
  };
}

export default ChatService;
