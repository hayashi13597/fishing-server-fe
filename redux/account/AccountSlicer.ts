import { createSlice } from "@reduxjs/toolkit";
const initState = {
  avatar: "https://i.imgur.com/iOTWGLo.png",
  address: "",
  phone: "",
  visiable: true,
  role: "admin",
  uid: "",
  id: 1,
  email: "admin@gmail.com",
  fullname: "Phạm Hoài Nam ",

  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMTFzczIzQGdtYWlsLmNvbSIsImlhdCI6MTcwMDI0ODA0NiwiZXhwIjoxNzAwNTA3MjQ2fQ.nvn8aTVOu1CMk8QDjgwcMfTzd5RJ9tjVG2WyGtHuPCs",
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMTFzczIzQGdtYWlsLmNvbSIsImlhdCI6MTcwMDI0ODA0NiwiZXhwIjoxNzAxMTEyMDQ2fQ.ewLCyiXMQ7x493sL3w6SpcWDShUx6A6qwrP9LcenR4w",
};
const AccountSlice = createSlice({
  name: "account",
  initialState: {
    account: initState,
  },
  reducers: {
    UpdateAccount(state, action) {
      state.account = action.payload;
    },
    LogoutAccount(state) {
      state.account = initState;
    },
  },
});
export const { UpdateAccount } = AccountSlice.actions;
export default AccountSlice.reducer;
