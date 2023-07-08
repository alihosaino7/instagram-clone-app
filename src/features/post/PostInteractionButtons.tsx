import { Tooltip } from "flowbite-react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

type PostInteractionButtonsProps = {
  hasLiked: boolean;
  removeLike: () => void;
  addLike: () => void;
  focus: () => void;
  likesCount: number;
};

export function PostInteractionButtons({
  hasLiked,
  removeLike,
  addLike,
  focus,
  likesCount,
}: PostInteractionButtonsProps) {
  return (
    <>
      {" "}
      <div className="flex items-center gap-4">
        <button onClick={hasLiked ? removeLike : addLike} className="text-2xl">
          {hasLiked ? (
            <Tooltip content="Unlike">
              {" "}
              <span className="text-red-500">
                <AiFillHeart />
              </span>
            </Tooltip>
          ) : (
            <Tooltip content="Like">
              <AiOutlineHeart />
            </Tooltip>
          )}
        </button>

        <button className="text-xl" onClick={focus}>
          <Tooltip content="Comment">
            <FaRegComment />{" "}
          </Tooltip>
        </button>
      </div>
      <p className="mt-2 font-semibold">{likesCount} like</p>
    </>
  );
}
