import { memo } from "react";
import { Author, IComment } from "../../types/types";
import { nanoid } from "@reduxjs/toolkit";

import CustomAvatar from "../../components/common/CustomAvatar";

// eslint-disable-next-line react-refresh/only-export-components
function Comment({
  expanded,
  comment,
}: {
  expanded: boolean;
  comment: IComment;
}) {
  return (
    <>
      {expanded ? (
        <div className="flex items-center gap-4">
          <CustomAvatar
            img={comment.author.avatar}
            className="w-[30px] h-[30px] flex-shrink-0"
          />
          <p>
            <b>{comment.author.username}</b> {comment.commentText}
          </p>
        </div>
      ) : (
        <div>
          <p className="break-all">
            <b className="mr-2">{comment.author.username}</b>
            {comment.commentText}
          </p>
        </div>
      )}
    </>
  );
}

type PostBodyProps = {
  expanded?: boolean;
  caption: string;
  comments: IComment[];
  author: Author;
};

// eslint-disable-next-line react-refresh/only-export-components
const PostBody = ({
  author,
  caption,
  comments,
  expanded = false,
}: PostBodyProps) => {
  const commentsList = comments.map((comment) => (
    <Comment key={nanoid()} expanded={expanded} comment={comment} />
  ));

  return (
    <>
      {expanded ? (
        <>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="shrink-0">
                <CustomAvatar img={author.avatar} size={30} />
              </div>

              <p className="font-medium">
                <b className="mr-2">{author.username}</b>
                {caption}
              </p>
            </div>
            {commentsList}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center">
            <p className="font-medium">
              <b className="mr-2">{author.username}</b>
              {caption}
            </p>
          </div>
          {commentsList}
        </>
      )}
    </>
  );
};

export default memo(PostBody);
