import { createSlice } from '@reduxjs/toolkit';
import productsData from './products.json';

const initialState = {
  products: productsData,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
});

export default productSlice.reducer;
