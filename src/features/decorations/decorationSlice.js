import { createSlice } from '@reduxjs/toolkit';
import decorationsData from './decorations.json';

const initialState = {
  decorations: decorationsData,
};

const decorationSlice = createSlice({
  name: 'decoration',
  initialState,
  reducers: {
  },
});


export default decorationSlice.reducer;
