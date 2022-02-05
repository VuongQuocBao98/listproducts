import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    categorys: [],
  },
  reducers: {
    categoryViewList(state, payload) {
      state.categorys = payload.payload;
    },
  },
});

const { actions, reducer } = productSlice;
export const { categoryViewList } = actions;
export default reducer;
