import { useParams } from "react-router-dom";
import { Container } from "../components";
import ProfileInfo from "../components/common/ProfileInfo";
import { UserPostsList } from "../components/UserPostsList";
import { useUserProfileById } from "../hooks/useUserProfileById";
import ProfileInfoSkeleton from "../components/skeletons/ProfileInfoSkeleton";
import SkeletonElement from "../components/skeletons/SkeletonElement";

export default function OtherUserProfile() {
  const { userId } = useParams();
  const {
    loading,
    user: otherUser,
    userPosts,
  } = useUserProfileById(userId as string);

  if (loading || !otherUser || !userPosts) {
    return (
      <Container>
        <ProfileInfoSkeleton />
        <div className="text-center">
          <div className="flex flex-wrap gap-[2%]">
            <div className="w-[32%] aspect-square">
              <SkeletonElement type="thumbnail" />
            </div>
            <div className="w-[32%] aspect-square">
              <SkeletonElement type="thumbnail" />
            </div>
            <div className="w-[32%] aspect-square">
              <SkeletonElement type="thumbnail" />
            </div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container>
        {" "}
        <ProfileInfo
          user={otherUser}
          postsCount={userPosts?.length}
          isAbleToFollow={true}
        />
        <div className="text-center">
          {userPosts.length > 0 ? (
            <UserPostsList posts={userPosts} />
          ) : (
            <h2 className="font-semibold text-3xl mt-[100px]">No Posts Yet</h2>
          )}
        </div>
      </Container>
    </>
  );
}
