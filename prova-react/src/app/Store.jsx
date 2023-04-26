import { configureStore, combineReducers } from '@reduxjs/toolkit';
import playerReducer from '../features/player/playerSlice';
import productReducer from '../features/products/productSlice'; // Import the new productReducer

// Create a rootReducer using combineReducers
const rootReducer = combineReducers({
  player: playerReducer,
  product: productReducer, 
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
