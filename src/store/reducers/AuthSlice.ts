import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthSlice {
  isAuth: boolean;
  checkingApiKey: boolean;
  userID: number;
}

const initialState: IAuthSlice = {
  isAuth: false,
  checkingApiKey: true,
  userID: 0,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth(state: IAuthSlice, action: PayloadAction<boolean>): void {
      state.isAuth = action.payload;
    },
    setChekingApiKey(state: IAuthSlice, action: PayloadAction<boolean>): void {
      state.checkingApiKey = action.payload;
    },
    setUserID(state: IAuthSlice, action: PayloadAction<number>): void {
      state.userID = action.payload;
    },
  },
});

export const { setIsAuth, setChekingApiKey, setUserID } = AuthSlice.actions;
export default AuthSlice.reducer;
