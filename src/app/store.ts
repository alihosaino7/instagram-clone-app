import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/post/postsSlice";
import modalReducer from "../features/modal/modalSlice";
import usersReducer from "../features/users/usersSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    modal: modalReducer,
    users: usersReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
