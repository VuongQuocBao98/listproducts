import { createSelector } from "@reduxjs/toolkit";

const cartItems = (state) => state.cart.cartItems;

// count number product in cart
export const cartItemsCount = createSelector(cartItems, (state) =>
  state.reduce((count, item) => count + item.quantity, 0)
);

//calculate total of cart

export const cartTotal = createSelector(cartItems, (items) =>
  items.reduce(
    (total, item) => total + item.quantity * item.product.salePrice,
    0
  )
);
