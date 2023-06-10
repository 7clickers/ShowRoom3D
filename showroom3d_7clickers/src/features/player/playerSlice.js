// playerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const playerInitialState = {
  position: { x: 0, y: 5, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
};

const playerSlice = createSlice({
  name: 'player',
  initialState: playerInitialState,
  reducers: {
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setRotation: (state, action) => {
      state.rotation = action.payload;
    },
  },
});

export const { setPosition, setRotation } = playerSlice.actions;

export default playerSlice.reducer;
