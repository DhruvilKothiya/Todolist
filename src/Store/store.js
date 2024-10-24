import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from './drawerSlice';
import authReducer from './authSlice'; 

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,  
    auth: authReducer,     
  },
});

export default store;
