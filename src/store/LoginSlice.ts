import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  isLoggedIn: boolean;
  username: string;
  password: string;
}

const initialState: LoginState = {
  isLoggedIn: false,
  username: "",
  password: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.username = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = "";
      state.password = "";
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

export const { login, logout, setUsername, setPassword } = loginSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: { login: LoginState }) =>
  state.login.isLoggedIn;
export const selectUsername = (state: { login: LoginState }) =>
  state.login.username;
export const selectPassword = (state: { login: LoginState }) =>
  state.login.password;

export default loginSlice.reducer;
