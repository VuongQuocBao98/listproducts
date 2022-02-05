import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import userApi from "../../api/userApi";
import KeyAuths from "../../constants/key-auth";

export const register = createAsyncThunk("user/register", async (payload) => {
  //call api to register
  const data = await userApi.register(payload);
  //save data to local storage
  // localStorage.setItem(KeyAuths.TOKEN, data.jwt);
  // localStorage.setItem(KeyAuths.USER, JSON.stringify(data.user));
  //save data cookie
  Cookies.set(KeyAuths.TOKEN, data.jwt, { expires: 30 });
  Cookies.set(KeyAuths.USER, JSON.stringify(data.user), { expires: 30 });

  return data.user;
});

export const login = createAsyncThunk("user/login", async (payload) => {
  //call api to login
  const data = await userApi.login(payload);
  //save data to local storage
  // localStorage.setItem(KeyAuths.TOKEN, data.jwt);
  // localStorage.setItem(KeyAuths.USER, JSON.stringify(data.user));
  //save data cookie
  Cookies.set(KeyAuths.TOKEN, data.jwt, { expires: 30 });
  Cookies.set(KeyAuths.USER, JSON.stringify(data.user), { expires: 30 });
  return data.user;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    curentUser: Cookies.get(KeyAuths.USER)
      ? JSON.parse(Cookies.get(KeyAuths.USER))
      : {},
    settings: {},
  },
  reducers: {
    logout(state) {
      // localStorage.removeItem(KeyAuths.USER);
      // localStorage.removeItem(KeyAuths.TOKEN);
      Cookies.remove(KeyAuths.USER);
      Cookies.remove(KeyAuths.TOKEN);
      state.curentUser = {};
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.curentUser = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.curentUser = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;

export default reducer;
