import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { IPost, IUser } from "../types/types";

export function useUserProfileById(userId: string) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [userPosts, setUserPosts] = useState<IPost[] | null>(null);

  async function getUser() {
    const userSnapshot = await getDoc(doc(db, "users", userId));
    return userSnapshot.data() as IUser;
  }

  async function getUserPosts(): Promise<IPost[]> {
    try {
      const userPostsSnapshot = await getDocs(
        query(collection(db, "posts"), where("authorId", "==", userId))
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
    if (!userId) return;

    const fetchData = async () => {
      setLoading(true);
      const userRes = await getUser();
      document.title = `${userRes.fullName} (@${userRes.username})`;
      setUser(userRes);
      setUserPosts(await getUserPosts());
      setLoading(false);
      console.log(await getUserPosts());
    };

    fetchData();

    return () => {
      document.title = "Instagram";
    };
  }, [userId]);

  return { loading, userPosts, user };
}
