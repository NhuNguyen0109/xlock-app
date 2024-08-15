import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AccountType from "../types/item";

export interface ItemState {
  selectedItem: AccountType;
  isCreating: boolean;
}

// Define the initial state
const initialState: ItemState = {
  selectedItem: {
    name: "",
    site: "",
    description: "",
    enc_credentials: "",
    logo_url: "",
    id: "",
    added_at: "",
    updated_at: "",
    type: "",
  },
  isCreating: false,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<AccountType>) => {
      state.selectedItem = action.payload;
    },

    setISCreatingTrue: (state) => {
      state.isCreating = true;
    },

    setISCreatingFalse: (state) => {
      state.isCreating = false;
    },
  },
});

export const itemActions = itemSlice.actions;
export default itemSlice.reducer;
