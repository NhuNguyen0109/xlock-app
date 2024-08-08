import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AccountType from "../types/item";

export interface ItemState {
  selectedItem: AccountType | null;
}

// Define the initial state
const initialState: ItemState = {
  selectedItem: null,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<AccountType>) => {
      state.selectedItem = action.payload;
    },
  },
});

export const itemActions = itemSlice.actions;
export default itemSlice.reducer;
