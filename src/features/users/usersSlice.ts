import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { IUser } from "../../types/types";

export const unfollowUser = createAsyncThunk(
  "users/unfollowUser",
  async ({
    followerId,
    userIdToUnfollow,
  }: {
    followerId: string;
    userIdToUnfollow: string;
  }) => {
    const removeFollower = updateDoc(doc(db, "users", userIdToUnfollow), {
      followers: arrayRemove(followerId),
    });

    const removeFollowing = updateDoc(doc(db, "users", followerId), {
      following: arrayRemove(userIdToUnfollow),
    });

    await Promise.all([removeFollower, removeFollowing]);
  }
);

export const followUser = createAsyncThunk(
  "users/followUser",
  async ({
    newFollowerId,
    followedUserId,
  }: {
    newFollowerId: string;
    followedUserId: string;
  }) => {
    const addFollower = updateDoc(doc(db, "users", followedUserId), {
      followers: arrayUnion(newFollowerId),
    });

    const addFollowing = updateDoc(doc(db, "users", newFollowerId), {
      following: arrayUnion(followedUserId),
    });

    await Promise.all([addFollower, addFollowing]);
  }
);

export interface IUsersSliceState {
  loading: boolean;
  error: string;
  users: IUser[];
}

const initialState: IUsersSliceState = {
  loading: false,
  error: "",
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // followUser
      .addCase(followUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(followUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(followUser.rejected, (state) => {
        state.loading = false;
      })

      // unfollowUser
      .addCase(unfollowUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(unfollowUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(unfollowUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
export const usersActions = usersSlice.actions;
