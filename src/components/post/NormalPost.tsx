import LoadingLayer from "../common/LoadingLayer";
import { IComment, ILike, IPost } from "../../types/types";
import AddComment from "./AddComment";
import PostBody from "./PostBody";
import PostHeader from "./PostHeader";
import { PostInteractionButtons } from "./PostInteractionButtons";

type NormalPostProps = {
  post: IPost;
  loading: boolean;
  comments: IComment[];
  likes: ILike[];
  hasLiked: boolean;
  date: string;
  addComment: (commentText: string) => Promise<void>;
  addLike: () => Promise<void>;
  removeLike: () => void;
  commentInputRef: React.MutableRefObject<HTMLInputElement>;
};

export const NormalPost = ({
  post,
  loading,
  comments,
  likes,
  addLike,
  removeLike,
  hasLiked,
  date,
  addComment,
  commentInputRef,
}: NormalPostProps) => {
  return (
    <div className="w-full">
      <div className="bg-white border rounded-md overflow-hidden relative">
        {loading && <LoadingLayer />}
        <PostHeader post={post} />
        <main>
          <div className="h-[320px] border-y">
            <img src={post.postImage} className="h-full w-full object-cover" />
          </div>
          <div className="p-3">
            <PostInteractionButtons
              likesCount={likes.length > 0 ? likes.length : 0}
              addLike={addLike}
              removeLike={removeLike}
              hasLiked={hasLiked}
              focus={() => commentInputRef.current.focus()}
            />
            <PostBody
              expanded={false}
              author={post.author}
              comments={comments}
              // fetchMoreComments={fetchMoreComments}
              caption={post.caption}
            />
            <p className="text-gray-500 font-medium text-sm uppercase mt-1">
              {date}
            </p>
          </div>
          <AddComment ref={commentInputRef} addComment={addComment} />
        </main>
      </div>
    </div>
  );
};
