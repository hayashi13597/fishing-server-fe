import { createSlice } from "@reduxjs/toolkit";
const initState = {
  avatar: "https://i.imgur.com/iOTWGLo.png",
  address: "",
  phone: "",
  visiable: false,
  role: "admin",
  uid: "",
  id: 1,
  email: "admin@gmail.com",
  fullname: "Phạm Hoài Nam ",
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwMDIwMDc3NywiZXhwIjoxNzAwNDU5OTc3fQ.n8dQm0u4DIAUbJTgEleeuA2PPsfznZow2fgs_D9_PT0",
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
