import { forwardRef, useState } from "react";

type AddCommentsProps = {
  addComment: (comment: string) => Promise<void>;
};

const AddComment = forwardRef<HTMLInputElement, AddCommentsProps>(
  ({ addComment }, ref) => {
    const [comment, setComment] = useState("");
    return (
      <div className="flex border-t h-[45px]">
        <input
          onChange={(e) => setComment(e.target.value)}
          ref={ref}
          type="text"
          className="border-none outline-0 flex-1"
          placeholder="Add a comment..."
          style={{ boxShadow: "none" }}
        />
        <button
          className={`p-2 basis-[10%] font-semibold ${
            comment ? "text-blue-500" : "text-blue-300"
          }`}
          onClick={() => addComment(comment)}
        >
          Post
        </button>
      </div>
    );
  }
);

export default AddComment;
