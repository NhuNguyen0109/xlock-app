import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RegisterInfo {
  username: string;
  email: string;
  password: string;
  rsa_key_pairs: {
    public: string;
    enc_pri: string;
    salt: string;
  };
}

const registerSlice = createSlice({
  name: "register",
  initialState: {
    username: "",
    email: "",
    password: "",
    rsa_key_pairs: {
      public: "",
      enc_pri: "",
      salt: "",
    },
  } as RegisterInfo,
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
      state.username = "";
      state.email = "";
      state.password = "";
      state.rsa_key_pairs.public = "";
      state.rsa_key_pairs.enc_pri = "";
      state.rsa_key_pairs.salt = "";
    },
  },
});

export const registerActions = registerSlice.actions;
export default registerSlice.reducer;
