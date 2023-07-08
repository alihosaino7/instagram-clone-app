import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { IPost, IUser } from "../types/types";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

interface ICurrentUserProfile {
  loading: boolean;
  userPosts: IPost[] | null;
  user: IUser | null;
}

export function useCurrentUserProfile(): ICurrentUserProfile {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userPosts, setUserPosts] = useState<IPost[] | null>(null);

  async function getUserPosts(): Promise<IPost[]> {
    try {
      const userPostsSnapshot = await getDocs(
        query(collection(db, "posts"), where("author.id", "==", user?.userId))
      );

      if (userPostsSnapshot.empty) return [];

      return userPostsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as IPost[];
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  useEffect(() => {
    if (!user) return;

    document.title = `${user.fullName} (@${user.username})`;

    setLoading(true);
    getUserPosts().then((posts) => {
      setUserPosts(posts);
      setLoading(false);
    });

    return () => {
      document.title = "Instagram";
    };
  }, [user]);

  return { loading, userPosts, user };
}
