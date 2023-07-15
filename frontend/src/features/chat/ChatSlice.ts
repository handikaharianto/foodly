import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Chat, Message } from "./types";
import { executeAsyncThunk, privateAxios } from "../../api/axios";
import { RootState } from "../../app/store";

export const createChat = executeAsyncThunk<{ users: string[] }, Chat>(
  "chat/createChat",
  (req) => privateAxios.post("/chats", req)
);

export const getAllChats = executeAsyncThunk<{ searchInput?: string }, Chat[]>(
  "chat/getAllChats",
  (req) => privateAxios.post("/chats/list", req)
);

export const getOneChat = executeAsyncThunk<{ chatId: string }, Chat>(
  "chat/getOneChat",
  (req) => privateAxios.get(`/chats/${req.chatId}`)
);

export const createMessage = executeAsyncThunk<
  {
    content: string;
    sender: string;
    chat: string;
  },
  Message
>("chat/createMessage", (req) =>
  privateAxios.post(`/chats/${req.chat}/messages`, {
    content: req.content,
    sender: req.sender,
  })
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

type ChatState = {
  chats: Chat[];
  chat: Chat | null;
  messages: Message[];
  message: Message | null;
  isLoading: boolean;
};

const initialState: ChatState = {
  chats: [],
  chat: null,
  messages: [],
  message: null,
  isLoading: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addNewMessage(state, action: PayloadAction<Message>) {
      state.messages = [...state.messages, action.payload];
    },
    addNewChatWithMessage(state, action: PayloadAction<Chat>) {
      state.chats.unshift(action.payload);
    },
    updateChatLatestMessage(state, action: PayloadAction<Message>) {
      if (state.chat) {
        state.chat = { ...state.chat, latestMessage: action.payload } as Chat;
      }
      state.chats = state.chats.map((chat) => {
        if (chat._id === action.payload.chat._id) {
          return {
            ...chat,
            latestMessage: action.payload,
          };
        }
        return chat;
      });
    },
    reorderUserContacts(state, action: PayloadAction<Message>) {
      state.chats.forEach((chat, index) => {
        if (chat._id === action.payload.chat._id) {
          const removedChat = state.chats.splice(index, 1)[0];
          state.chats.unshift(removedChat);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chat = action.payload;
      })
      .addCase(getAllChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = action.payload;
      })
      .addCase(getOneChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chat = action.payload;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = [...state.messages, action.payload];
        state.chats = state.chats.map((chat) => {
          if (chat._id === action.payload.chat._id) {
            return { ...chat, latestMessage: action.payload };
          }
          return chat;
        });
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
        isAnyOf(createChat.pending, getAllChats.pending, getOneMessage.pending),
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          createChat.rejected,
          getAllChats.rejected,
          getOneChat.rejected,
          createMessage.rejected,
          getAllMessages.rejected,
          getOneMessage.rejected
        ),
        (state, action) => {
          state.isLoading = false;
        }
      );
  },
});

export const {
  addNewMessage,
  addNewChatWithMessage,
  updateChatLatestMessage,
  reorderUserContacts,
} = chatSlice.actions;

export const chatState = (state: RootState) => state.chat;

export default chatSlice.reducer;
