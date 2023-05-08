import { createSlice } from "@reduxjs/toolkit";

const raycasterSlice = createSlice({
  name: "raycaster",
  initialState: {
    intersectedProductID: null,
  },
  reducers: {
    setIntersectedProductID: (state, action) => {
      state.intersectedProductID = action.payload;
    },
  },
});

export const { setIntersectedProductID } = raycasterSlice.actions;
export default raycasterSlice.reducer;
