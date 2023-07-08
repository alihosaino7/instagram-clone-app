import { useAuth } from "../contexts/AuthContext";
import { useFollow } from "../hooks/useFollow";
import { Avatar } from "flowbite-react";
import { IUser } from "../types/types";

function SuggestedUserSkeletion() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-[30px] h-[30px] skeleton skeleton-profile-img"></div>
      <div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
      </div>
    </div>
  );
}

type SuggestedUserProps = { sUser: IUser };

function SuggestedUser({ sUser }: SuggestedUserProps) {
  const { user } = useAuth();

  const { isFollower, follow, unfollow } = useFollow(user as IUser, sUser);

  if (!user) {
    return <SuggestedUserSkeletion />;
  }

  return (
    <div className="flex items-center">
      {" "}
      <div className="flex items-center">
        <Avatar img={sUser.userImage} rounded size="sm" />
        <h2 className="font-bold ml-2">{sUser.username}</h2>
      </div>
      {!isFollower ? (
        <button
          onClick={follow}
          className="ml-auto text-md text-blue-400 hover:text-blue-500 font-semibold"
        >
          Follow
        </button>
      ) : (
        <button
          onClick={unfollow}
          className="ml-auto text-md text-red-400 hover:text-red-500 font-semibold"
        >
          Unfollow
        </button>
      )}
    </div>
  );
}

export default SuggestedUser;
