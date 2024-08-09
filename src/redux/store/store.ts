import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import { authReducer } from "../slices/auth.slice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistStore, persistReducer } from "redux-persist";
import { cartSlice } from "../slices/cart.slice";

// persist user information

const persistConfig = {
  key: authReducer.name,
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer.reducer);

const persistCartConfig = {
  key: cartSlice.name,
  storage,
};
const persistedCartReducer = persistReducer(
  persistCartConfig,
  cartSlice.reducer
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [authReducer.name]: persistedAuthReducer,
    [cartSlice.name]: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
