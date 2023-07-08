import { useEffect, useState } from "react";
import { followUser, unfollowUser } from "../features/users/usersSlice";
import { IUser } from "../types/types";
import { useAppDispatch } from "../app/hooks";

export function useFollow(authUser: IUser, otherUser: IUser) {
  const [isFollower, setIsFollower] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authUser && otherUser) {
      setIsFollower(otherUser.followers.includes(authUser.userId));
    }
  }, [authUser, otherUser]);

  function follow() {
    setIsFollower(true);
    dispatch(
      followUser({
        newFollowerId: authUser.userId,
        followedUserId: otherUser.userId,
      })
    );
  }

  function unfollow() {
    setIsFollower(false);
    dispatch(
      unfollowUser({
        followerId: authUser.userId,
        userIdToUnfollow: otherUser.userId,
      })
    );
  }

  return { isFollower, follow, unfollow };
}
