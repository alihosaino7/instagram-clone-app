import { createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../types/types";

export interface IModalSliceState {
  showConfirmLogoutModal: boolean;
  showCreatePostModal: boolean;
  showEditPostModal: boolean;
  showPostOptionsModal: boolean;
  post: IPost | null;
  onConfirm: () => void;
  warningTitle: string;
}

const INITIAL_STATE: IModalSliceState = {
  showConfirmLogoutModal: false,
  showCreatePostModal: false,
  showEditPostModal: false,
  showPostOptionsModal: false,
  post: null,
  warningTitle: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onConfirm: () => {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState: INITIAL_STATE,
  reducers: {
    closeCreatePostModal(state) {
      state.showCreatePostModal = false;
    },
    closeEditPostModal(state) {
      state.showEditPostModal = false;
      state.post = null;
    },
    closePostOptionsModal(state) {
      state.showPostOptionsModal = false;
    },
    openCreatePostModal(state) {
      state.showCreatePostModal = true;
    },
    openEditPostModal(state) {
      state.showEditPostModal = true;
    },
    openPostOptionsModal(state, action: { payload: { post: IPost } }) {
      state.showPostOptionsModal = true;
      state.post = action.payload.post;
    },
    openConfirmLogoutModal(state, action) {
      state.showConfirmLogoutModal = true;
      state.onConfirm = action.payload.onConfirm;
      state.warningTitle = action.payload.warningTitle;
    },
    closeConfirmLogoutModal(state) {
      state.showConfirmLogoutModal = false;
    },
  },
});

export const modalUiActions = modalSlice.actions;
export default modalSlice.reducer;
