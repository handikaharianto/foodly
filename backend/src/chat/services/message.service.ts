import { UserWithoutPassword } from "src/user/types";
import messageModel from "../models/message.model";
import ApiError from "../../common/api-error";
import HTTP_STATUS from "../../common/http-status-code";
import { CHAT_NOT_FOUND, MESSAGE_NOT_FOUND } from "../../common/error-message";
import { Chat, Message, NewMessage } from "../types";
import chatModel from "../models/chat.model";

class MessageService {
  createMessage = async (message: NewMessage): Promise<Message> => {
    const chat = await chatModel.findById(message.chat);

    if (!chat) throw new ApiError(HTTP_STATUS.NOT_FOUND_404, CHAT_NOT_FOUND);

    let newMessage = await messageModel.create(message);
    newMessage = await newMessage.populate<{ chat: Chat }>({
      path: "chat",
    });
    newMessage = await newMessage.populate<{ sender: UserWithoutPassword }>({
      path: "sender",
    });

    // update latest message of chat
    await chatModel.findByIdAndUpdate(message.chat, {
      latestMessage: newMessage._id,
    });

    return newMessage;
  };

  getAllMessages = async (chat: string): Promise<Message[]> => {
    const messages = await messageModel
      .find({ chat })
      .populate<{ users: UserWithoutPassword }>({
        path: "sender",
        select: "-password",
      })
      .populate<{ chat: Chat }>({
        path: "chat",
      });

    return messages;
  };

  getOneMessage = async (chat: string, message: string): Promise<Message> => {
    const chatMessage = await messageModel
      .findOne({
        chat,
        message,
      })
      .populate<{ sender: UserWithoutPassword }>({
        path: "sender",
        select: "-password",
      })
      .populate<{ chat: Chat }>({
        path: "chat",
      });

    if (!chatMessage)
      throw new ApiError(HTTP_STATUS.NOT_FOUND_404, MESSAGE_NOT_FOUND);

    return chatMessage;
  };
}

export default MessageService;
