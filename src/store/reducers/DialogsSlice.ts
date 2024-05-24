import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDialog } from "../../types/interfaces/IDialog";

export interface IDialogsSlice {
  dialogs: IDialog[];
  selectedDialog: IDialog | null;
  currentMessage: string;
  sendingMessage: boolean;
}

const initialState: IDialogsSlice = {
  dialogs: [],
  selectedDialog: null,
  currentMessage: "",
  sendingMessage: false,
};

export const DialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    setDialogs(state: IDialogsSlice, action: PayloadAction<IDialog[]>): void {
      state.dialogs = action.payload;

      if (action.payload.length) {
        state.selectedDialog = action.payload[0];
      }
    },
    setSelectedDialog(
      state: IDialogsSlice,
      action: PayloadAction<IDialog | null>
    ): void {
      state.selectedDialog = action.payload;
    },
    updateSelectedDialogContent(
      state: IDialogsSlice,
      action: PayloadAction<IDialog>
    ): void {
      if (state.selectedDialog) {
        state.selectedDialog = { ...state.selectedDialog, ...action.payload };

        const foundDialog = state.dialogs.find(
          (item) => item.id === action.payload.id
        );

        if (foundDialog) {
          foundDialog.content.push(
            action.payload.content[action.payload.content.length - 1]
          );
        }
      }
    },
    addNewDialog(state: IDialogsSlice, action: PayloadAction<IDialog>): void {
      state.dialogs.unshift(action.payload);
      state.selectedDialog = state.dialogs[0];
    },
    setCurrentMessage(
      state: IDialogsSlice,
      action: PayloadAction<string>
    ): void {
      state.currentMessage = action.payload;
    },
    setSendingMessage(
      state: IDialogsSlice,
      action: PayloadAction<boolean>
    ): void {
      state.sendingMessage = action.payload;
    },
  },
});

export const {
  setDialogs,
  setSelectedDialog,
  updateSelectedDialogContent,
  addNewDialog,
  setCurrentMessage,
  setSendingMessage,
} = DialogsSlice.actions;
export default DialogsSlice.reducer;
