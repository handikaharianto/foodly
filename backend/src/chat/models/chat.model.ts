import { Schema, model } from "mongoose";
import { Chat } from "../types";

const chatSchema = new Schema<Chat>(
  {
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const chatModel = model<Chat>("Chat", chatSchema);

export default chatModel;
