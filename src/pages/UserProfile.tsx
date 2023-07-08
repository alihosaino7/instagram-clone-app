import { Container } from "../components";
import { UserPostsList } from "../components/UserPostsList";
import ProfileInfo from "../components/common/ProfileInfo";
import ProfileInfoSkeleton from "../components/skeletons/ProfileInfoSkeleton";
import SkeletonElement from "../components/skeletons/SkeletonElement";
import { useCurrentUserProfile } from "../hooks/useCurrentUserProfile";

export default function UserProfile() {
  const { loading, user, userPosts } = useCurrentUserProfile();

  if (loading || !user || !userPosts) {
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
        <ProfileInfo
          user={user}
          isAbleToFollow={false}
          postsCount={userPosts?.length}
        />
        <div className="text-center pb-4 sm:pb-8">
          {userPosts?.length > 0 ? (
            <UserPostsList posts={userPosts} />
          ) : (
            <h2 className="font-semibold text-3xl mt-[100px]">No Posts Yet</h2>
          )}
        </div>
      </Container>
    </>
  );
}
