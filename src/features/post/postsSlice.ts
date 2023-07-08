import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../types/types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../config/firebase";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  try {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const postsQuerySnapshot = await getDocs(q);

    if (postsQuerySnapshot.empty) {
      return [];
    }

    const posts = postsQuerySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as IPost[];

    return posts;
  } catch (error) {
    return error;
  }
});

export interface IPostsSliceState {
  loading: boolean;
  error: string;
  posts: IPost[];
}

const initialState: IPostsSliceState = {
  loading: false,
  error: "",
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postDeleted(state, action: PayloadAction<{ postId: string }>) {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload.postId
      );
    },
    postUpdated(
      state,
      action: PayloadAction<{ postId: string; newPost: IPost }>
    ) {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.postId) {
          return action.payload.newPost;
        }
        return post;
      });
    },
    postAdded(state, action: PayloadAction<{ post: IPost }>) {
      state.posts = [action.payload.post, ...state.posts];
    },
    postsAdded(state, action: PayloadAction<{ posts: IPost[] }>) {
      state.posts = [...state.posts, ...action.payload.posts];
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getPosts.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(getPosts.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.posts = action.payload;
  //     })
  //     .addCase(getPosts.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.error as string;
  //     });
  // },
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;
