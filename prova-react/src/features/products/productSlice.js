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

export const selectedVariantIDSelector = (productID) => (state) =>
  state.products.find((product) => product.id === productID)?.selectedVariantID;

export default productSlice.reducer;
