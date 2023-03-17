import { configureStore } from '@reduxjs/toolkit'
import { botApi } from './features/api/botApi';

export const store = configureStore({
  reducer: {
    [botApi.reducerPath]: botApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(botApi.middleware),
});