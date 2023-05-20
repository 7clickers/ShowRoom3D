import { createSlice } from '@reduxjs/toolkit';
import productsData from './products.json';

const initialState = {
  products: productsData,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedColor(state, action) {
      const { productID, colorName } = action.payload;
      const product = state.products.find((product) => product.id === productID);
      if (product) {
        product.selectedColor = colorName;
      }
    },
  },
});

export const selectedColorSelector = (productID) => (state) =>
  state.products.find((product) => product.id === productID)?.selectedColor;

export const productByIDSelector = (productID) => (state) =>
  state.product.products.find((product) => product.id === productID);

export const { setSelectedColor } = productSlice.actions;

export default productSlice.reducer;
