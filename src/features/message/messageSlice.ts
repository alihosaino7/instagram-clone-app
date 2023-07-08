import { createSlice, nanoid } from "@reduxjs/toolkit";

type MessageType = "success" | "danger" | "info";

type Message = {
  id: string;
  content: string;
  type: MessageType;
};

const initialState: Message[] = [];

type Payload = { msg: string; type: MessageType; id: string };

const messageSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showMessage(state, action: { payload: Payload }) {
      const newMessage = {
        id: nanoid(),
        content: action.payload.msg,
        type: action.payload.type,
      };

      state.push(newMessage);
    },
    removeMessage(state, action: { payload: Payload }) {
      if (state.length === 0) return;
      state = state.filter((message) => message.id !== action.payload.id);
    },
  },
});

export default messageSlice.reducer;

export const messageUiActions = messageSlice.actions;
