import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "UI",
  initialState: {
    isSidebarVisible: false,
  },
  reducers: {
    setIsSidebarVisible: (state, action) => {
      state.isSidebarVisible = action.payload;
    },
  },
});

export const { setIsSidebarVisible } = uiSlice.actions;
export default uiSlice.reducer;
