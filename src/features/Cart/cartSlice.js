import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    showMiniCart: false,
    cartItems: JSON.parse(localStorage.getItem("cart"))
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
  },
  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true;
    },
    hideMiniCart(state) {
      state.showMiniCart = false;
    },
    addToCart(state, action) {
      // newItem ={ id,product:{},quantity }
      const newItem = action.payload;
      const index = state.cartItems.findIndex((x) => x.id === newItem.id);
      if (index >= 0) {
        // increase quantity
        state.cartItems[index].quantity += newItem.quantity;
      } else {
        // add to cart
        state.cartItems.push(newItem);
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      // check product is availabel in cart
      const index = state.cartItems.findIndex((x) => x.id === id);
      if (index >= 0) {
        state.cartItems[index].quantity = quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeCartItem(state, action) {
      const idRemove = action.payload;

      state.cartItems = state.cartItems.filter((x) => x.id !== idRemove);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    CartTest(state, action) {
      console.log(state);
    },
  },
});

const { reducer, actions } = cartSlice;

export const {
  showMiniCart,
  hideMiniCart,
  addToCart,
  setQuantity,

  removeCartItem,
} = actions;

export default reducer;
