import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import KeyType from "../types/key";

// export interface User {
//   // name?: string;
//   email: string;
//   password: string;
// }

export interface LoginState {
  login: boolean;
  enc_pri: string;
}

const initialState: LoginState = {
  login: false,
  enc_pri: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    handleSuccessLogin: (state) => {
      state.login = true;
    },

    handleFailureLogin: (state) => {
      state.login = false;
      state.enc_pri = "";
    },

    setEncPri: (state, action: PayloadAction<string>) => {
      state.enc_pri = action.payload;
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
