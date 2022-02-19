import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  isLoggedIn: false,
  isWalletConnected: false,
  userInfo: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialValue,
  },
  reducers: {
    connection: (state, action)=>{
      state.value.isWalletConnected = action.payload.isWalletConnected 
    },
    login: (state, action) => {
      console.log("Login Payload", action.payload);
      state.value = action.payload;
    },
    logout: (state, action) => {
      state.value = initialValue;
    },
  },
});

export const { logout, login, connection } = userSlice.actions;
export default userSlice.reducer;
