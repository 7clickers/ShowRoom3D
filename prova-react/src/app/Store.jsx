// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import playerReducer from '../features/player/playerSlice';

// Create a rootReducer using combineReducers
const rootReducer = combineReducers({
  player: playerReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
