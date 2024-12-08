"use client";

import { SearchResponse } from "@/lib/data";
import { Book } from "@/types/book";
import { Page } from "@/types/search";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchValues: Page<Book>;
}

const initialState: SearchState = {
  searchValues: {
    content: [],
    pageable: {
      sort: {
        sorted: false,
        unsorted: true,
        empty: true,
      },
      offset: 0,
      pageSize: 0,
      pageNumber: 0,
      paged: true,
      unpaged: false,
    },
    totalPages: 0,
    totalElements: 0,
    last: false,
    size: 0,
    number: 0,
    sort: {
      sorted: false,
      unsorted: true,
      empty: true,
    },
    first: false,
    numberOfElements: 0,
    empty: true,
  },
};

const headerSlice = createSlice({
  name: "isStore",
  initialState: {
    isStore: false,
  },
  reducers: {
    setIsStore(state, action) {
      state.isStore = action.payload;
    },
  },
});

export const fetchSearchValues = createAsyncThunk<Page<Book>, string>(
  "searchValues/fetchSearchValues",
  async (query: string) => {
    const response = await SearchResponse(query);
    return response.json();
  }
);

const searchSlice = createSlice({
  name: "searchValues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSearchValues.fulfilled,
      (state, action: PayloadAction<Page<Book>>) => {
        state.searchValues = action.payload;
      }
    );
  },
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

const wishlistSlice = createSlice({
  name: "isWishlist",
  initialState: {
    isWishlist: false,
  },
  reducers: {
    setIsWishlist(state, action) {
      state.isWishlist = action.payload;
    },
  },
});

const clearWishListSlice = createSlice({
  name: "clearWishList",
  initialState: {
    clearWishList: false,
  },
  reducers: {
    setClearWishList(state, action) {
      state.clearWishList = action.payload;
    },
  },
});

// const setUrlSlice = createSlice({
//   name: "bookURL",
//   initialState: {
//     bookURL: null,
//   },
//   reducers: {
//     setBookURL(state, action) {
//       state.bookURL = action.payload;
//     },
//   },
// });

// const setReadAction = createSlice({
//   name: "readAction",
//   initialState: {
//     readAction: null,
//   },
//   reducers: {
//     setRead(state, action) {
//       state.readAction = action.payload;
//     },
//   },
// });

export const { setUser } = userSlice.actions;
export const { setIsStore } = headerSlice.actions;
export const { setIsWishlist } = wishlistSlice.actions;
export const { setClearWishList } = clearWishListSlice.actions;
export const { clearUser } = userSlice.actions;
// export const { setBookURL } = setUrlSlice.actions;
// export const { setRead } = setReadAction.actions;
export const headerReducer = headerSlice.reducer;
export const searchReducer = searchSlice.reducer;
export const userReducer = userSlice.reducer;
export const wishlistReducer = wishlistSlice.reducer;
export const clearWishlistReducer = clearWishListSlice.reducer;
// export const urlReducer = setUrlSlice.reducer;
// export const readActionReducer = setReadAction.reducer;
