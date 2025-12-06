import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OnlineUser {
  userId: string;
  username: string;
  email: string;
  avatar?: string;
  socketId: string;
}

interface ChatState {
  onlineUsers: OnlineUser[];
  onlineUsersCount: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  onlineUsers: [],
  onlineUsersCount: 0,
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // Fetch online users
    fetchOnlineUsersStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    fetchOnlineUsersSuccess: (state, action: PayloadAction<OnlineUser[]>) => {
      state.onlineUsers = action.payload;
      state.onlineUsersCount = action.payload.length;
      state.isLoading = false;
      state.error = null;
    },

    fetchOnlineUsersError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Update online users (from socket)
    updateOnlineUsers: (state, action: PayloadAction<OnlineUser[]>) => {
      state.onlineUsers = action.payload;
      state.onlineUsersCount = action.payload.length;
      state.error = null;
    },

    // Update online users count
    updateOnlineUsersCount: (state, action: PayloadAction<number>) => {
      state.onlineUsersCount = action.payload;
    },

    // Clear chat state
    clearChatState: (state) => {
      state.onlineUsers = [];
      state.onlineUsersCount = 0;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchOnlineUsersStart,
  fetchOnlineUsersSuccess,
  fetchOnlineUsersError,
  updateOnlineUsers,
  updateOnlineUsersCount,
  clearChatState,
} = chatSlice.actions;

export default chatSlice.reducer;
