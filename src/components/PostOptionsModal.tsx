import { modalUiActions } from "../features/modal/modalSlice";
import { useState, useEffect, memo } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import LoadingLayer from "./common/LoadingLayer";
import { IPost, IUser, ModalType } from "../types/types";
import { Loader } from ".";
import { postsActions } from "../features/post/postsSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { unfollowUser } from "../features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Modal } from "./common/Modal";
import { deleteObject, ref } from "firebase/storage";

const PostOptionsModal = memo(({ onClose }: ModalType) => {
  const post = useAppSelector((state) => state.modal.post) as IPost;
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const pathnameId = location.pathname.split("/")[2];

  const [isFollowed, setIsFollwed] = useState(false);

  useEffect(() => {
    if (post && user) {
      setLoading(true);
      getDoc(doc(db, "users", post.author.id)).then((userSnapshot) => {
        const postCreator = userSnapshot.data() as IUser;
        setIsFollwed(postCreator.followers.includes(user?.userId as string));
        setLoading(false);
      });
    }

    return () => {
      onClose();
    };
  }, [post, user]);

  async function removeRelatedPostData() {
    await getDocs(
      query(collection(db, "likes"), where("postDocumentId", "==", post.id))
    ).then((likesSnapshot) => {
      likesSnapshot.docs.forEach(async (likeDoc) => {
        await deleteDoc(likeDoc.ref);
      });
    });
    await getDocs(
      query(collection(db, "comments"), where("postDocumentId", "==", post.id))
    ).then((likesSnapshot) => {
      likesSnapshot.docs.forEach(async (likeDoc) => {
        await deleteDoc(likeDoc.ref);
      });
    });
    await deleteObject(ref(storage, `/posts_images/post-img-${post.id}`));
  }

  const isPostOwner = post.author.id === user?.userId;

  async function deletePost(): Promise<void> {
    setLoading(true);
    await deleteDoc(doc(db, "posts", post.id));
    await removeRelatedPostData();
    setLoading(false);
    if (location.pathname !== "/") {
      navigate(-1);
    } else {
      dispatch(postsActions.postDeleted({ postId: post.id }));
    }
  }

  function showEditPostModal(): void {
    dispatch(modalUiActions.openEditPostModal());
  }

  function handleUnfollow() {
    dispatch(
      unfollowUser({
        followerId: user?.userId as string,
        userIdToUnfollow: post.author.id,
      })
    );

    onClose();
  }
  const liRedStyle =
    "text-sm sm:text-base hover:bg-gray-100 border-b border-[#ccc] py-4 text-center font-bold text-red-500 cursor-pointer block w-full";
  const liStyle =
    "text-sm sm:text-base hover:bg-gray-100 border-b border-[#ccc] py-4 text-center cursor-pointer block w-full";

  return (
    <Modal>
      {" "}
      <Modal.Box className="w-[400px]">
        {loading && <LoadingLayer />}
        {!loading ? (
          <ul>
            {isPostOwner && (
              <li className={liRedStyle} onClick={deletePost}>
                Delete
              </li>
            )}
            {!isPostOwner && isFollowed && (
              <li className={liRedStyle} onClick={handleUnfollow}>
                Unfollow
              </li>
            )}
            {isPostOwner && (
              <li className={liStyle} onClick={showEditPostModal}>
                Edit
              </li>
            )}

            {pathnameId !== post.id && (
              <Link className={liStyle} to={`/post-details/${post.id}`}>
                {" "}
                Go to post
              </Link>
            )}

            <li
              className="hover:bg-gray-100 py-4 text-sm sm:text-base sm:py-4 text-center cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </li>
          </ul>
        ) : (
          <div className="relative h-[200px]">
            <Loader />
          </div>
        )}
      </Modal.Box>
    </Modal>
  );
});

export default PostOptionsModal;
