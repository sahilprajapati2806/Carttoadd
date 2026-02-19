import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

const Cartslice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      const item = state.find(i => i._id === action.payload._id);

      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    remove(state, action) {
      const index = state.findIndex(i => i._id === action.payload);
      if (index !== -1) state.splice(index, 1);

      localStorage.setItem("cart", JSON.stringify(state));
    },

    incrementQty(state, action) {
      const item = state.find(i => i._id === action.payload);
      if (item) item.quantity += 1;

      localStorage.setItem("cart", JSON.stringify(state));
    },

    decrementQty(state, action) {
      const item = state.find(i => i._id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;

      localStorage.setItem("cart", JSON.stringify(state));
    }
  }
});

export const { add, remove, incrementQty, decrementQty } = Cartslice.actions;
export default Cartslice.reducer;
