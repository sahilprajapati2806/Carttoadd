import { createSlice } from "@reduxjs/toolkit";
 let initialState = JSON.parse(localStorage.getItem("cart")) || []
const Cartslice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      const item = state.find(i => i.id === action.payload.id);

      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
        localStorage.setItem("cart",JSON.stringify(state))
      }
    },

    remove(state, action) {
      let rem =state.filter(item => item.id !== action.payload);
      localStorage.setItem("cart",JSON.stringify(rem))
      return rem
      
    },

    incrementQty(state, action) {
      const item = state.find(i => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      localStorage.setItem("cart",JSON.stringify(state))
    },

    decrementQty(state, action) {
      const item = state.find(i => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      localStorage.setItem("cart",JSON.stringify(state))
    }
  }
});

export const { add, remove, incrementQty, decrementQty } = Cartslice.actions;
export default Cartslice.reducer;
