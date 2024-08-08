import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface User {
//   // name?: string;
//   email: string;
//   password: string;
// }

export interface LoginState {
  login: boolean;
}

const initialState: LoginState = {
  login: false,
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
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
