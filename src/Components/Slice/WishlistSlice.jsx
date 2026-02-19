import { createSlice } from "@reduxjs/toolkit";

const initialState =
  JSON.parse(localStorage.getItem("wishlist")) || [];

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const item = state.find(i => i._id === action.payload.id);

      if (!item) {
        state.push(action.payload);
        localStorage.setItem("wishlist", JSON.stringify(state));
      }
    },

    removeFromWishlist(state, action) {
      const updated = state.filter(item => item._id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    }
  }
});

export const { addToWishlist, removeFromWishlist } =
  WishlistSlice.actions;
export default WishlistSlice.reducer;
