import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import loginReducer from "./LoginSlice";
import { pollsApi } from "./pollsApi";

// persist config: only keep isLoggedIn + username
const loginPersistConfig = {
  key: "login",
  storage,
  whitelist: ["isLoggedIn", "username"],
};

const rootReducer = combineReducers({
  login: persistReducer(loginPersistConfig, loginReducer),
  [pollsApi.reducerPath]: pollsApi.reducer, // add RTK Query reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }).concat(pollsApi.middleware), // add RTK Query middleware
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
