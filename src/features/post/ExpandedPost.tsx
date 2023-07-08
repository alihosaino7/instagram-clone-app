import LoadingLayer from "../../components/common/LoadingLayer";
import { IComment, ILike, IPost } from "../../types/types";
import AddComment from "./AddComment";
import PostBody from "./PostBody";
import PostHeader from "./PostHeader";
import { PostInteractionButtons } from "./PostInteractionButtons";

type ExpandedPostProps = {
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

export const ExpandedPost = ({
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
}: ExpandedPostProps) => {
  return (
    <div className="flex relative bg-white h-[500px] border border-[#ccc] w-full">
      {loading && <LoadingLayer />}
      <div className="border-r border-[#ccc] basis-[60%] flex items-center h-full">
        <div className="w-full h-full">
          <img src={post.postImage} className="h-full w-full object-contain" />
        </div>
      </div>
      <div className="basis-[40%] flex flex-col">
        <PostHeader expanded={true} post={post} />
        <div className="flex p-4 flex-1 border-b max-h-[300px] overflow-y-auto border-[#ccc] custom-scrollbar">
          <PostBody
            expanded={true}
            author={post.author}
            comments={comments}
            // fetchMoreComments={fetchMoreComments}
            caption={post.caption}
          />
        </div>
        <div className="p-4 mt-auto">
          <PostInteractionButtons
            likesCount={likes.length > 0 ? likes.length : 0}
            addLike={addLike}
            removeLike={removeLike}
            hasLiked={hasLiked}
            focus={() => commentInputRef.current.focus()}
          />
          <p className="text-gray-400 text-xs uppercase mt-1">{date}</p>
        </div>
        <AddComment ref={commentInputRef} addComment={addComment} />
      </div>
    </div>
  );
};
