import { Link } from "react-router-dom";
import { IPost } from "../types/types";
import { FaComment } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import SkeletonElement from "./skeletons/SkeletonElement";

type UserPostsProps = {
  posts: IPost[];
};

type UserPostProps = {
  post: IPost;
};

function UserPost({ post }: UserPostProps) {
  const { id, likesCount, commentsCount, postImage } = post;

  if (!postImage) {
    <div className="w-full aspect-square">
      <SkeletonElement type="thumbnail" />
    </div>;
  }

  return (
    <Link
      to={`/post-details/${id}`}
      key={id}
      className="w-full aspect-square group relative"
    >
      <div className="bg-[rgba(0,0,0,0.4)] absolute left-0 top-0 w-full h-full hidden items-center justify-center group-hover:flex">
        {(likesCount > 0 || commentsCount > 0) && (
          <div className="flex items-center gap-4 lg:gap-8">
            {likesCount > 0 && (
              <span className="text-white flex items-center gap-2 text-xs lg:text-lg">
                <AiFillHeart /> {likesCount}
              </span>
            )}
            {commentsCount > 0 && (
              <span className="text-white flex items-center gap-2 text-xs lg:text-lg">
                <FaComment /> {commentsCount}
              </span>
            )}
          </div>
        )}
      </div>

      <img src={postImage} className="w-full h-full object-cover" />
    </Link>
  );
}

export function UserPostsList({ posts }: UserPostsProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {posts.map((post) => (
        <UserPost key={post.id} post={post} />
      ))}
    </div>
  );
}
