import { combineReducers } from '@reduxjs/toolkit';
import playerReducer from '../features/player/playerSlice';
import productReducer from '../features/products/productSlice';
import raycasterSlice from '../features/raycaster/raycasterSlice';
import decorationSlice from '../features/decorations/decorationSlice';
import cartSlice from '../features/cart/cartSlice';

const rootReducer = combineReducers({
    player: playerReducer,
    product: productReducer,
    raycaster: raycasterSlice,
    decoration: decorationSlice,
    cart: cartSlice, 
});
  
export default rootReducer;