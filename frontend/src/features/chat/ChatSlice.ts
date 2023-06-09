import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Chat, Message } from "./types";
import { executeAsyncThunk, privateAxios } from "../../api/axios";
import { RootState } from "../../app/store";

export const createChat = executeAsyncThunk<{ users: string[] }, void>(
  "chat/createChat",
  (req) => privateAxios.post("/chats", req)
);

export const getAllChats = executeAsyncThunk<{ userId: string }, Chat[]>(
  "chat/getAllChats",
  (req) => privateAxios.post("/chats/list", req)
);

export const getOneChat = executeAsyncThunk<{ chatId: string }, Chat>(
  "chat/getOneChat",
  (req) => privateAxios.get(`/chats/${req.chatId}`)
);

export const getAllMessages = executeAsyncThunk<{ chatId: string }, Message[]>(
  "chat/getAllMessages",
  (req) => privateAxios.post(`/chats/${req.chatId}/messages/list`)
);

export const getOneMessage = executeAsyncThunk<
  {
    chatId: string;
    messageId: string;
  },
  Message
>("chat/getOneMessage", (req) =>
  privateAxios.get(`/chats/${req.chatId}/messages/${req.messageId}`)
);

type chatState = {
  chats: Chat[];
  chat: Chat | null;
  messages: Message[];
  message: Message | null;
  isLoading: boolean;
};

const initialState: chatState = {
  chats: [],
  chat: null,
  messages: [],
  message: null,
  isLoading: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createChat.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getAllChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = action.payload;
      })
      .addCase(getOneChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chat = action.payload;
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(getOneMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addMatcher(
        isAnyOf(
          createChat.pending,
          getAllChats.pending,
          getOneChat.pending,
          getAllMessages.pending,
          getOneMessage.pending
        ),
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          createChat.rejected,
          getAllChats.rejected,
          getOneChat.rejected,
          getAllMessages.rejected,
          getOneMessage.rejected
        ),
        (state, action) => {
          state.isLoading = false;
        }
      );
  },
});

export const chatState = (state: RootState) => state.chat;

export default chatSlice.reducer;
