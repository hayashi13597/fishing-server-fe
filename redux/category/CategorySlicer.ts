import { createSlice } from "@reduxjs/toolkit";

const CategorySlice = createSlice({
  name: "category",
  initialState: {
    listCate: [],
  },
  reducers: {
    UploadCategory(state, action) {
      state.listCate = action.payload;
    },
  },
});
export const { UploadCategory } = CategorySlice.actions;
export default CategorySlice.reducer;
