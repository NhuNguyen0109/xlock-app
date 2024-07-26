import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ItemType from "../types/item";

export interface ItemState {
  selectedItem: ItemType;
}

const initialState: ItemState = {
  selectedItem: {
    id: "",
    name: "",
    account: "",
    url: "",
    description: "",
    credentials: "",
    password: "",
    added_time: "",
    updated_time: "",
  },
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<ItemType>) => {
      state.selectedItem = action.payload;
    },
  },
});

export const itemActions = itemSlice.actions;
export default itemSlice.reducer;
