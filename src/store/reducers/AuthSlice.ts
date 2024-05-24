import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthSlice {
  isAuth: boolean;
  checkingApiKey: boolean;
}

const initialState: IAuthSlice = {
  isAuth: false,
  checkingApiKey: true,
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
  },
});

export const { setIsAuth, setChekingApiKey } = AuthSlice.actions;
export default AuthSlice.reducer;
