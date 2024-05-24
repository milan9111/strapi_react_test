import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChatMessage } from "../../types/interfaces/IChatMessage";

export interface IDialogsSlice {
  currentMessage: string;
  allMessages: IChatMessage[];
  sendingMessage: boolean;
}

const initialState: IDialogsSlice = {
  currentMessage: "",
  allMessages: [],
  sendingMessage: false,
};

export const DialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    setCurrentMessage(
      state: IDialogsSlice,
      action: PayloadAction<string>
    ): void {
      state.currentMessage = action.payload;
    },
    setAllMessages(
      state: IDialogsSlice,
      action: PayloadAction<IChatMessage[]>
    ): void {
      state.allMessages = action.payload;
    },
    setSendingMessage(
      state: IDialogsSlice,
      action: PayloadAction<boolean>
    ): void {
      state.sendingMessage = action.payload;
    },
    addMessageToField(
      state: IDialogsSlice,
      action: PayloadAction<IChatMessage>
    ): void {
      state.allMessages.push(action.payload);
    },
  },
});

export const {
  setCurrentMessage,
  setAllMessages,
  setSendingMessage,
  addMessageToField,
} = DialogsSlice.actions;
export default DialogsSlice.reducer;
