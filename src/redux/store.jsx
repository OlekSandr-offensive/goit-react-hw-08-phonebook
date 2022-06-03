import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import filterSlice from './contacts/filters-reducer';
import { contactsApi } from './contacts/contacts-slice';
import { authApi } from './auth/auth-operation';
import authSlice from './auth/auth-slice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authSlice),
    [contactsApi.reducerPath]: contactsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    filter: filterSlice.reducer,
    // contacts: contactSlice.reducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    contactsApi.middleware,
    authApi.middleware,
  ],
});

export const persistor = persistStore(store);
