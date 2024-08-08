import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import RegisterInfo from "../types/register-info";

const createEmptyRegisterInfo = (): RegisterInfo => ({
  username: "",
  email: "",
  password: "", //Raw -> hash
  fullname: "",
  dob: "",
  address: "",
  phone_number: "",
  gender: "",
  country: "",
  backup_email: "",
  rsa_key_pair: {
    public: "",
    enc_pri: "", //ConcatStr
    salt: "",
  },
});

const initialState = createEmptyRegisterInfo();

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterInfo: (state, action: PayloadAction<Partial<RegisterInfo>>) => {
      Object.assign(state, action.payload);
    },

    setRsaKeyPairs: (
      state,
      action: PayloadAction<Partial<RegisterInfo["rsa_key_pair"]>>
    ) => {
      state.rsa_key_pair = { ...state.rsa_key_pair, ...action.payload };
    },

    resetRegisterInfo: (state) => {
      Object.assign(state, createEmptyRegisterInfo());
    },
  },
});

export const registerActions = registerSlice.actions;
export default registerSlice.reducer;
