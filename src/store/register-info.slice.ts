import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { encrypt } from "../utils/encrypt";

export interface RegisterInfo {
  username: string;
  email: string;
  password: string;
  public_key: string;
  encrypted_private_key: string;
}

const registerSlice = createSlice({
  name: "register",
  initialState: {
    username: "",
    email: "",
    password: "",
    public_key: "",
    encrypted_private_key: "",
  } as RegisterInfo,
  reducers: {
    // setRegisterInfo: {
    //   reducer: (state, action: PayloadAction<Partial<RegisterInfo>>) => {
    //     Object.assign(state, action.payload);
    //   },
    //   prepare: (payload: Partial<RegisterInfo>) => {
    //     const encryptedPayload = { ...payload };
    //     if (encryptedPayload.encrypted_private_key) {
    //       encryptedPayload.encrypted_private_key = encrypt(
    //         encryptedPayload.encrypted_private_key
    //       );
    //     }

    //     return { payload: encryptedPayload };
    //   },
    // },

    setRegisterInfo: (state, action: PayloadAction<Partial<RegisterInfo>>) => {
      Object.assign(state, action.payload);
    },

    resetRegisterInfo: (state) => {
      state.username = "";
      state.email = "";
      state.password = "";
      state.public_key = "";
      state.encrypted_private_key = "";
    },
  },
});

export const registerActions = registerSlice.actions;
export default registerSlice.reducer;
