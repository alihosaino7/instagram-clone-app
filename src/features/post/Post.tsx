import { useState, useRef, memo } from "react";
import {
  FieldValue,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect } from "react";
import { IComment, ILike, IPost } from "../../types/types";
import { useAuth } from "../../contexts/AuthContext";
import { modalUiActions } from "../modal/modalSlice";
import PostSkeleton from "../../components/skeletons/PostSkeletion";
import { ExpandedPostSkeleton } from "../../components/skeletons/ExpandedPostSkeleton";
import { useAppDispatch } from "../../app/hooks";
import { ExpandedPost } from "./ExpandedPost";
import { NormalPost } from "./NormalPost";

type PostProps = {
  post: IPost;
  expanded?: boolean;
};

export const Post = memo(({ post, expanded = false }: PostProps) => {
  const { user } = useAuth();
  const createdAt = post.createdAt;
  const milliseconds =
    createdAt instanceof FieldValue
      ? Date.now()
      : createdAt["seconds"] * 1000 +
        Math.floor(createdAt["nanoseconds"] / 1000000);

  const date = new Date(milliseconds).toDateString();
  const [comments, setComments] = useState<IComment[]>([]);
  const [likes, setLikes] = useState<ILike[]>([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!(user || post)) return;

    async function getData() {
      const likesSnapshot = await getDocs(
        query(collection(db, "likes"), where("postDocumentId", "==", post.id))
      );

      setLikes(likesSnapshot.docs.map((doc) => doc.data()) as ILike[]);

      await getComments();
      setHasLiked(
        likesSnapshot.docs
          .map((doc) => doc.data())
          .some(
            (doc) =>
              doc.authorId === user?.userId && doc.postDocumentId === post.id
          )
      );

      setIsLoaded(true);
    }

    getData();

    return () => {
      dispatch(modalUiActions.closePostOptionsModal());
    };
  }, [user?.userId, post.id]);

  const commentInputRef = useRef<HTMLInputElement>(null!);

  function removeLike() {
    setHasLiked(false);

    setLikes(likes.filter((like) => like.authorId !== user?.userId));

    getDocs(
      query(
        collection(db, "likes"),
        where("postDocumentId", "==", post.id),
        where("authorId", "==", user?.userId)
      )
    ).then((likesQuerySnapshot) => {
      const deletePromises = likesQuerySnapshot.docs.map((likeDoc) => {
        return deleteDoc(likeDoc.ref);
      });

      Promise.all(deletePromises);
    });
  }

  async function addLike() {
    setHasLiked(true);

    // Add one like to UI before it is added to db collection
    setLikes(
      (prev) =>
        [
          ...prev,
          { authorId: user?.userId, postDocumentId: post.id },
        ] as ILike[]
    );

    await updateDoc(doc(db, "posts", post.id), {
      likesCount: likes.length + 1,
    });

    try {
      // Add a new like to "likes" collection in firestore
      await addDoc(collection(db, "likes"), {
        authorId: user?.userId,
        postDocumentId: post.id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getComments() {
    const commentsCollection = collection(db, "comments");
    const q = query(commentsCollection, where("postDocumentId", "==", post.id));
    getDocs(q).then((data) => {
      if (data.empty) {
        return setComments([]);
      }
      setComments(
        data.docs.map((commentDoc) => ({
          ...commentDoc.data(),
          id: commentDoc.id,
        })) as IComment[]
      );
    });
  }

  async function addComment(comment: string) {
    if (!comment) return;
    setLoading(true);

    try {
      const newComment = {
        createdAt: serverTimestamp(),
        commentText: comment,
        postDocumentId: post.id,
        author: {
          id: user?.userId,
          username: user?.username,
          avatar: user?.userImage,
        },
      };
      await addDoc(collection(db, "comments"), newComment);
      await updateDoc(doc(db, "posts", post.id), {
        commentsCount: comments.length + 1,
      });
      await getComments();
      commentInputRef.current.value = "";
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const dispatch = useAppDispatch();

  // const fetchMoreComments = useCallback(() => {
  //   alert("Todo: Fetch more comments when they are a lot");
  // }, []);

  const postProps = {
    comments,
    loading,
    likes,
    addComment,
    addLike,
    hasLiked,
    removeLike,
    post,
    date,
    commentInputRef,
  };

  if (expanded) {
    return (
      <>
        <div className="sm:hidden w-full">
          {!isLoaded ? <PostSkeleton /> : <NormalPost {...postProps} />}
        </div>
        <div className="hidden sm:block w-full">
          {!isLoaded ? (
            <ExpandedPostSkeleton />
          ) : (
            <ExpandedPost {...postProps} />
          )}
        </div>
      </>
    );
  }

  if (!isLoaded) {
    return <PostSkeleton />;
  }

  return <NormalPost {...postProps} />;
});
