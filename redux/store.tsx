import { configureStore } from "@reduxjs/toolkit";
import CategorySlicer from "./category/CategorySlicer";
import AccountSlicer from "./account/AccountSlicer";

export const store = configureStore({
  reducer: {
    cate: CategorySlicer,
    account: AccountSlicer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
