import { createSlice } from '@reduxjs/toolkit';
import productsData from './products.json';

const initialState = {
  products: productsData,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedVariantID(state, action) {
      const { productID, variantID } = action.payload;
      const product = state.products.find((product) => product.id === productID);
      if (product) {
        product.selectedVariantID = variantID;
      }
    },
  },
});

export const selectedVariantIDSelector = (productID) => (state) =>
  state.products.find((product) => product.id === productID)?.selectedVariantID;

export const productByIDSelector = (productID) => (state) =>
  state.product.products.find((product) => product.id === productID);

export const { setSelectedVariantID } = productSlice.actions;

export default productSlice.reducer;
