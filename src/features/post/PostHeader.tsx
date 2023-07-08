import { BsThreeDots } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch } from "react-redux";
import { modalUiActions } from "../modal/modalSlice";
import { IPost } from "../../types/types";
import CustomAvatar from "../../components/common/CustomAvatar";

type PostHeaderProps = {
  expanded?: boolean;
  post: IPost;
};

const PostHeader = ({ post, expanded = false }: PostHeaderProps) => {
  const { user } = useAuth();
  const isPostOwner = user?.userId === post.author.id;
  const location = useLocation();
  const profileLink = isPostOwner ? "/profile" : `/profile/${post.author.id}`;
  const dispatch = useDispatch();
  return (
    <header
      className={`flex items-center p-2 px-3 ${
        expanded && "py-4 px-4 border-b border-[#ccc]"
      }`}
    >
      <CustomAvatar img={post.author.avatar} size={30} />
      <Link to={profileLink} className="ml-4 font-bold">
        {post.author.username}
      </Link>

      {!(
        post.author.id !== user?.userId &&
        location.pathname.split("/")[1] === "post-details"
      ) && (
        <button
          className="ml-auto text-gray-500 text-xl"
          onClick={() => {
            dispatch(
              modalUiActions.openPostOptionsModal({
                post: post,
              })
            );
          }}
        >
          <BsThreeDots />
        </button>
      )}
    </header>
  );
};

export default PostHeader;
