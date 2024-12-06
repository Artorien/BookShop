"use client";

import { configureStore } from "@reduxjs/toolkit";
import { headerReducer } from "./slice";
import { searchReducer } from "./slice";
import { userReducer } from "./slice";
import { wishlistReducer } from "./slice";
import { clearWishlistReducer } from "./slice";
// import { readActionReducer } from "./slice";

const store = configureStore({
  reducer: {
    isStore: headerReducer,
    searchValues: searchReducer,
    user: userReducer,
    // isWishlist: wishlistReducer,
    clearWishList: clearWishlistReducer,
    // bookURL: urlReducer,
    // readAction: readActionReducer,
  },
});

export default store;
