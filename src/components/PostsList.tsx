import { useState, useEffect } from "react";
import { IPost } from "../types/types";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Post } from ".";
import { postsActions } from "../features/post/postsSlice";
import PostSkeleton from "./skeletons/PostSkeletion";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const PAGE_LIMIT = 3;

const PostsList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts) as IPost[];
  const [lastDoc, setLastDoc] = useState<IPost | null>(null);

  const postsCollection = collection(db, "posts");

  useEffect(fetchPosts, []);

  useEffect(() => {

    function handleInfiniteScroll() {
      if (scrollY + innerHeight >= document.documentElement.scrollHeight) 
        fetchMorePosts();
    }

    addEventListener("scroll", handleInfiniteScroll);
    return () => {
      removeEventListener("scroll", handleInfiniteScroll);
    };
   
  }, [lastDoc]);

  function fetchMorePosts() {
    // last document is necissary for fetching more posts
    if (!lastDoc) return;

    getDocs(
      query(
        postsCollection,
        limit(PAGE_LIMIT),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc)
      )
    ).then((postsSnapshot) => {
      const newPostsChunk = postsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.data().id ? doc.data().id : doc.id,
      })) as IPost[];

      const lastDoc = postsSnapshot.docs[postsSnapshot.docs.length - 1] as any;
    
      dispatch(postsActions.postsAdded({ posts: newPostsChunk }));

      setLastDoc(lastDoc);
    });
  }

  function fetchPosts() {
    if (posts.length > 0) return;

    getDocs(
      query(postsCollection, limit(PAGE_LIMIT), orderBy("createdAt", "desc"))
    ).then((postsSnapshot) => {
      const posts = postsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.data().id ? doc.data().id : doc.id,
      })) as IPost[];

      const lastDoc = postsSnapshot.docs[postsSnapshot.docs.length - 1] as any;

      dispatch(postsActions.postsAdded({ posts: posts }));
      setLastDoc(lastDoc);
    });
  }

  // If posts not loaded yet, display skeleton posts until posts loaded
  if (!posts) {
    return (
      <div className="flex flex-col flex-1 gap-4">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 gap-4">
      {posts?.map((post: IPost) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
