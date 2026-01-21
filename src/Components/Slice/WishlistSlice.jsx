import { createSlice } from "@reduxjs/toolkit";

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addToWishlist(state, action) {
      const item = state.find(i => i.id === action.payload.id);
      if (!item) {
        state.push(action.payload);
      }
    },
    removeFromWishlist(state, action) {
      return state.filter(item => item.id !== action.payload);
    }
  }
});

export const { addToWishlist, removeFromWishlist } = WishlistSlice.actions;
export default WishlistSlice.reducer;
