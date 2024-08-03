import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RegisterInfo {
  username: string;
  email: string;
  password: string; // HashedPassword in Base64
  fullname: string;
  dob: string;
  address: string;
  phone_number: string;
  gender: string;
  country: string;
  backup_email: string;
  rsa_key_pairs: {
    public: string;
    enc_pri: string;
    salt: string;
  };
}

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
  rsa_key_pairs: {
    public: "",
    enc_pri: "",
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
      action: PayloadAction<Partial<RegisterInfo["rsa_key_pairs"]>>
    ) => {
      state.rsa_key_pairs = { ...state.rsa_key_pairs, ...action.payload };
    },

    resetRegisterInfo: (state) => {
      Object.assign(state, createEmptyRegisterInfo());
    },
  },
});

export const registerActions = registerSlice.actions;
export default registerSlice.reducer;
