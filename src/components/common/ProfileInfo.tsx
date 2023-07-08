import { IUser } from "../../types/types";
import { AiOutlineCamera } from "react-icons/ai";
import { useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import CustomAvatar from "./CustomAvatar";
import { useFollow } from "../../hooks/useFollow";
import ProfileInfoSkeleton from "../skeletons/ProfileInfoSkeleton";

type ProfileInfoProps = {
  user: IUser | null;
  isAbleToFollow: boolean;
  postsCount: number | undefined;
};

function ProfileInfo({
  user,
  isAbleToFollow = false,
  postsCount,
}: ProfileInfoProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelecteImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { user: authUser } = useAuth();

  const { isFollower, follow, unfollow } = useFollow(
    authUser as IUser,
    user as IUser
  );

  async function handleUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);

    const storageRef = ref(storage, `/users_images/${user?.userId}`);
    const uploadTask = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(uploadTask.ref);

    await updateDoc(doc(db, "users", user?.userId as string), {
      userImage: downloadURL,
    });

    setSelecteImage(downloadURL);

    setLoading(false);
  }

  if (!user) {
    return <ProfileInfoSkeleton />;
  }

  return (
    <div className="flex items-center flex-col sm:flex-row relative pt-4 pb-2 mb-4 sm:py-8 sm:mb-8 border-b border-[#ccc]">
      <div className="flex w-full items-center mb-4">
        {" "}
        <div className="w-[32%] text-center">
          <input
            type="file"
            ref={fileInputRef}
            hidden
            onChange={handleUploadImage}
          />
          <div className="w-[60px] sm:w-[130px] h-[60px] sm:h-[130px] mx-auto relative">
            <CustomAvatar
              img={selectedImage || user?.userImage}
              // size={60}
              className="w-full h-full"
              loading={loading}
            />
            {authUser?.userId == user?.userId && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`absolute bottom-[12%] right-[-8px] z-[100] rounded-full flex items-center 
              hover:shadow-[0px_2px_4px_0_rgba(0,0,0,.5)] justify-center bg-white shadow-[0px_2px_4px_0_rgba(0,0,0,.3)] w-[20px] h-[20px] text-sm 
              sm:w-[35px] sm:h-[35px] sm:text-xl`}
              >
                <AiOutlineCamera />
              </button>
            )}
          </div>
        </div>
        <div className="ml-2 flex-grow sm:flex-grow-0 sm:w-[300px] flex flex-col gap-1 sm:gap-3">
          <div className="flex items-center gap-2">
            {" "}
            <h2 className="text-lg sm:text-3xl mr-4">{user?.username}</h2>
            {isAbleToFollow &&
              (isFollower ? (
                <button
                  onClick={unfollow}
                  className="rounded-md py-1 px-4 font-semibold bg-gray-200 hover:bg-gray-300"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={follow}
                  className="rounded-md py-1 px-4 text-white bg-blue-500 hover:bg-blue-600 font-semibold"
                >
                  Follow
                </button>
              ))}
          </div>

          <div className="sm:flex items-center gap-6 sm:gap-0 sm:justify-between hidden">
            <div className="flex items-center">
              <span className="font-bold mr-1 text-sm sm:text-lg">
                {postsCount ? postsCount : 0}
              </span>
              <p className="text-sm sm:text-lg font-medium">posts</p>
            </div>
            <div className="flex items-center">
              <span className="font-bold mr-1 text-sm sm:text-lg">
                {user?.followers.length}
              </span>
              <p className="text-sm sm:text-lg font-medium">followers</p>
            </div>
            <div className="flex items-center">
              <span className="font-bold mr-1 text-sm sm:text-lg">
                {user?.following.length}
              </span>
              <p className="text-sm sm:text-lg font-medium">following</p>
            </div>
          </div>
          <h2 className="font-semibold text-sm sm:text-xl sm:mt-1">
            {user?.fullName}
          </h2>
        </div>
      </div>

      <div className="flex items-center w-full justify-around sm:hidden">
        <div className="flex items-center">
          <span className="font-bold mr-1 text-sm sm:text-lg">
            {postsCount ? postsCount : 0}
          </span>
          <p className="text-sm sm:text-lg font-medium">posts</p>
        </div>
        <div className="flex items-center">
          <span className="font-bold mr-1 text-sm sm:text-lg">
            {user?.followers.length}
          </span>
          <p className="text-sm sm:text-lg font-medium">followers</p>
        </div>
        <div className="flex items-center">
          <span className="font-bold mr-1 text-sm sm:text-lg">
            {user?.following.length}
          </span>
          <p className="text-sm sm:text-lg font-medium">following</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
