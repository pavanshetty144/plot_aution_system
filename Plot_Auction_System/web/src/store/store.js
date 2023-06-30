// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './feature/authSlice';
import plotsReducer from './feature/plotsSlice';
import { persistStore, persistReducer } from 'redux-persist';
 // Import the storage type (e.g., localStorage)
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Add the slice name(s) you want to persist
};

const rootReducer = combineReducers({
  auth:authReducer,
  plots:plotsReducer
});



const persistedReducer = persistReducer(persistConfig,rootReducer );


const store = configureStore({
  reducer:persistedReducer
});

export const persistor = persistStore(store);
export default store;