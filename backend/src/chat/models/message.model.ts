import { Schema, model } from "mongoose";
import { Message } from "../types";

const MessageSchema = new Schema<Message>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    sender: {
      type: String,
      ref: "User",
      required: true,
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
  },
  { timestamps: true }
);

const messageModel = model<Message>("Message", MessageSchema);

export default messageModel;
