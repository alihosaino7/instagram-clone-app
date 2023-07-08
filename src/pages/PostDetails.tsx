import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IPost } from "../types/types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Container, Post } from "../components";
// import { ExpandedPostSkeleton } from "../components/skeletons/ExpandedPostSkeleton";

export default function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    if (!postId) return;

    getDoc(doc(db, "posts", postId as string)).then((postSnapshot) => {
      setPost({ ...postSnapshot.data(), id: postSnapshot.id } as IPost);
    });
  }, [postId]);

  return (
    <div className="h-screen pt-10 sm:pt-20 ">
      <Container>
        <div className="flex items-center">
          {post && <Post expanded={true} post={post} />}
        </div>
      </Container>
    </div>
  );
}
