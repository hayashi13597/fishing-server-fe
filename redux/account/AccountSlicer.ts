import UserApi from "@/api-client/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleAttachToken } from "../../api-client";
export interface IAccount {
  id: string;
  username: string;
  fullname: string;
  avatar: string;
  email: string;
  address: string;
  phone: string;
  accessToken: string;
  visiable: boolean;
  uid: string | null;
  created_at: string;
  updated_at: string;
  role: string;
}
const initialState: IAccount = {
  id: "",
  username: "",
  fullname: "",
  avatar: "/assets/avatar.png",
  email: "",
  phone: "",

  address: "",
  role: "member",
  accessToken: "",
  visiable: false,
  uid: null,
  created_at: "",
  updated_at: "",
};
const AccountSlice = createSlice({
  name: "account",
  initialState: {
    account: initialState,
  },
  reducers: {
    UpdateAccount(state, action) {
      state.account = action.payload;
    },
    LogoutAccount(state) {
      state.account = initialState;
      handleAttachToken("");
    },
  },
  extraReducers(builder) {
    builder.addCase(FetchFirstLoginWithToken.fulfilled, (state, action) => {
      console.log(action.payload.account);
      state.account = action.payload.account;
    });
  },
});
export const FetchFirstLoginWithToken = createAsyncThunk(
  "users/loginWithToken",
  async () => {
    const res = await UserApi.loginFast();

    if (res) {
      const account: IAccount = res.data.account;

      handleAttachToken(account.accessToken);
      return { account };
    } else {
      return Promise.reject("dont have token");
    }
  }
);

export const { UpdateAccount, LogoutAccount } = AccountSlice.actions;
export default AccountSlice.reducer;
