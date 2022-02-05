import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/Counter/counterSlice";
import userReducer from "./features/Auth/userSlice";
import productReducer from "./features/Products/productSlice";
import cartReducer from "./features/Cart/cartSlice";

const rootReducer = {
  counter: counterReducer,
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
