import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Product } from "../model/product";

interface DetailState {
  detail?: Product;
}
const initialState: DetailState = {
  detail: undefined,
};

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    setDetailProduct: (state, action: PayloadAction<Product>) => {
      state.detail = action.payload;
    },
    removeDetailProduct: (state, action: PayloadAction<void>) => {
      state.detail = undefined;
    },
  },
});

export const { removeDetailProduct, setDetailProduct } = detailSlice.actions;

export default detailSlice.reducer;
