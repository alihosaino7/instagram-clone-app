import SuggestedUser from "./SuggestedUser";
import { IUser } from "../types/types";
import CustomAvatar from "./common/CustomAvatar";
import { nanoid } from "@reduxjs/toolkit";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

import RightSideSkeleton from "./skeletons/RightSideSkeleton";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

function RightSide() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState<IUser[]>([]);

  const usersCollection = collection(db, "users");

  useEffect(() => {
    if (user) {
      fetchSuggestedUsers();
    }
  }, [user]);

  function fetchSuggestedUsers() {
    setLoading(true);
    getDocs(query(usersCollection, where("userId", "!=", user?.userId)))
      .then((usersSnapshot) => {
        setSuggestedUsers(
          usersSnapshot.docs
            .map((doc) => doc.data())
            .filter(
              (suggestedUser) => !suggestedUser.followers.includes(user?.userId)
              // suggestedUser.userId !== user?.userId
            ) as IUser[]
        );
      })
      .then(() => setLoading(false));
  }

  if (!user || loading) {
    return <RightSideSkeleton />;
  }

  return (
    <div className="hidden md:block basis-[30%] pt-2 ml-8">
      <div className="flex items-center">
        <CustomAvatar img={user.userImage} size={50} />
        <div className="ml-4">
          <h2 className="font-bold leading-none">{user.username}</h2>
          <p className="font-medium">{user.fullName}</p>
        </div>
      </div>
      {suggestedUsers.length > 0 && (
        <h2 className="text-gray-500 font-bold text-md my-5">
          Suggestions for you
        </h2>
      )}
      <div className="flex flex-col gap-4">
        {" "}
        {suggestedUsers.map((user) => (
          <SuggestedUser key={nanoid()} sUser={user} />
        ))}
      </div>
    </div>
  );
}

export default RightSide;
