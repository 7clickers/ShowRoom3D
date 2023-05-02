import { combineReducers } from '@reduxjs/toolkit';
import playerReducer from '../features/player/playerSlice';
import productReducer from '../features/products/productSlice';
import cartSlice from '../features/cart/cartSlice';

const rootReducer = combineReducers({
    player: playerReducer,
    product: productReducer,
    cart: cartSlice, 
});
  
export default rootReducer;