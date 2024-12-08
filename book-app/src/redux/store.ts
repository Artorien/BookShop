"use client";

import { configureStore } from "@reduxjs/toolkit";
import { headerReducer } from "./slice";
import { searchReducer } from "./slice";
import { userReducer } from "./slice";
import { clearWishlistReducer } from "./slice";

const store = configureStore({
  reducer: {
    isStore: headerReducer,
    searchValues: searchReducer,
    user: userReducer,
    clearWishList: clearWishlistReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
