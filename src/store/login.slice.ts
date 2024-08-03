import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface User {
//   // name?: string;
//   email: string;
//   password: string;
// }

export interface LoginState {
  login: boolean;
  access_token: string | null;
}

const initialState: LoginState = {
  login: false,
  access_token: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    handleAccessToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
    },

    handleLoggedIn: (state) => {
      state.login = true;
    },

    handleFailureLogin: (state) => {
      state.login = false;
      state.access_token = null;
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
