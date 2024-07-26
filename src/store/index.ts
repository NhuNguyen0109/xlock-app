import { configureStore } from "@reduxjs/toolkit";
import itemReducer, { ItemState } from "./item.slice.ts";
import loginReducer, { LoginState } from "./login.slice.ts";
import registerReducer, { RegisterInfo } from "./register-info.slice.ts";

const store = configureStore({
  reducer: {
    item: itemReducer,
    login: loginReducer,
    register: registerReducer,
  },
});

export type RootState = {
  item: ItemState;
  login: LoginState;
  register: RegisterInfo;
};

export default store;
