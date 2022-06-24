import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import deviceReducer from '../features/device/deviceSlice'
import noteReducer from '../features/notes/noteSlice'

export const store = configureStore({
  reducer: {
   auth: authReducer,
   devices: deviceReducer,
   notes: noteReducer,

  },
});
