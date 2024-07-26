import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
  login: boolean;
  user_id: string | null;
}

const loginSlice = createSlice({
  name: "login",
  initialState: {
    login: false,
    user_id: null,
  } as LoginState,
  reducers: {
    handleSuccessLogin: (state, action: PayloadAction<string | null>) => {
      state.user_id = action.payload;
    },

    handleLoggedIn: (state) => {
      state.login = true;
    },

    handleFailureLogin: (state) => {
      state.login = false;
      state.user_id = null;
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
