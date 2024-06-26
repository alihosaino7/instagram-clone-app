import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import { CreatePostModal, Loader, PrivateRoute } from "./components";
import NotFound from "./pages/NotFound";
import PostOptionsModal from "./components/modals/PostOptionsModal";
import { EditPostModal } from "./components/modals/EditPostModal";
import ConfirmModal from "./components/modals/ConfirmModal";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { modalUiActions } from "./features/modal/modalSlice";

const PostDetails = lazy(() => import("./pages/PostDetails"));
const Home = lazy(() => import("./pages/Home"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const OtherUserProfile = lazy(() => import("./pages/OtherUserProfile"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));

function ModalsContainer() {
  const dispatch = useAppDispatch();
  const {
    showConfirmLogoutModal,
    showCreatePostModal,
    showEditPostModal,
    showPostOptionsModal,
  } = useAppSelector((state) => state.modal);
  return (
    <>
      {showPostOptionsModal && (
        <PostOptionsModal
          onClose={() => dispatch(modalUiActions.closePostOptionsModal())}
        />
      )}
      {showConfirmLogoutModal && (
        <ConfirmModal
          onClose={() => dispatch(modalUiActions.closeConfirmLogoutModal())}
        />
      )}
      {showCreatePostModal && (
        <CreatePostModal
          onClose={() => dispatch(modalUiActions.closeCreatePostModal())}
        />
      )}
      {showEditPostModal && (
        <EditPostModal
          onClose={() => dispatch(modalUiActions.closeEditPostModal())}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <>
      <BrowserRouter>
        {" "}
        <ModalsContainer />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/auth">
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/post-details/:postId" element={<PostDetails />} />
              <Route path="/profile">
                <Route index element={<UserProfile />} />
                <Route path=":userId" element={<OtherUserProfile />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
