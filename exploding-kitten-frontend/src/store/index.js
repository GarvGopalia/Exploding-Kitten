// src/store/index.js

import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';

// Configuring the Redux store
const store = configureStore({
  reducer: {
    game: gameReducer, // Adding the game slice to the store
  },
});

export default store;
