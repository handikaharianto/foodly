import { UserWithoutPassword } from "src/user/types";
import messageModel from "../models/message.model";
import ApiError from "../../common/api-error";
import HTTP_STATUS from "../../common/http-status-code";
import { MESSAGE_NOT_FOUND } from "../../common/error-message";
import { Message } from "../types";

class MessageService {
  getAllMessages = async (chat: string): Promise<Message[]> => {
    const messages = await messageModel
      .find({ chat })
      .populate<{ sender: UserWithoutPassword }>({
        path: "sender",
        select: "-password",
      });

    return messages;
  };

  getOneMessage = async (chat: string, message: string): Promise<Message> => {
    const chatMessage = await messageModel.findOne({
      chat,
      message,
    });

    if (!chatMessage)
      throw new ApiError(HTTP_STATUS.NOT_FOUND_404, MESSAGE_NOT_FOUND);

    return chatMessage;
  };
}

export default MessageService;
