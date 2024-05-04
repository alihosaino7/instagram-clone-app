import { memo, useState, useRef, useEffect } from "react";
import { modalUiActions } from "../../features/modal/modalSlice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { postsActions } from "../../features/post/postsSlice";
import { IPost, ModalType } from "../../types/types";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Modal } from "../common/Modal";
import LoadingLayer from "../common/LoadingLayer";
import CustomAvatar from "../common/CustomAvatar";

export const EditPostModal = memo(({ onClose }: ModalType) => {
  const { post } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState<string>(post?.caption as string);
  const captionTextareaRef = useRef<HTMLTextAreaElement>(null); // Create a ref for the caption input

  useEffect(() => {
    if (captionTextareaRef.current) {
      captionTextareaRef.current.focus();
    }
  });

  const oldCaption = post?.caption || "";

  const hasCaptionChanged = oldCaption.trim() !== caption.trim();

  function cancelOperation() {
    dispatch(modalUiActions.closePostOptionsModal());
    onClose();
  }

  async function saveChanges() {
    // function won't excute if user made no changes
    if (!hasCaptionChanged) return;

    setLoading(true);

    await updateDoc(doc(db, "posts", post?.id as string), {
      caption: caption,
    });

    // dispatch(getPosts());
    dispatch(
      postsActions.postUpdated({
        postId: post?.id as string,
        newPost: { ...(post as IPost), caption },
      })
    );

    setLoading(false);

    onClose();
    dispatch(modalUiActions.closePostOptionsModal());
  }

  const rightSideHeaderRef = useRef<HTMLElement>(null!);

  console.log(oldCaption);
  console.log(caption);
  console.log(oldCaption === caption);

  return (
    <Modal>
      <Modal.Box className="w-full lg:w-[900px]">
        {loading && <LoadingLayer />}
        <Modal.Header className="flex items-center justify-between w-full p-4 border-b border-[#ccc]">
          <h2 className="font-semibold text-lg">Edit info</h2>
          <button onClick={cancelOperation}>Cancel</button>
        </Modal.Header>

        <div className="flex h-[500px]">
          <div className="hidden sm:flex bg-gray-200 basis-[55%] border-r border-[#ccc] items-center">
            <div className="h-[250px] w-full">
              <img
                src={post?.postImage}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="flex-1">
            <header
              className="flex gap-3 items-center p-4 border-b border-[#ccc]"
              ref={rightSideHeaderRef}
            >
              <CustomAvatar
                className="h-[35px] w-[35px]"
                img={post?.author.avatar}
              />
              <h3 className="font-medium text-md">{post?.author.username}</h3>
            </header>
            <div className={`p-4 flex flex-col w-full h-[calc(100%-67px)]`}>
              {" "}
              <textarea
                ref={captionTextareaRef}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="resize-none border border-[#ccc] p-4 w-full flex-1 rounded-md"
                style={{ boxShadow: "none" }}
              ></textarea>
              <button
                disabled={loading || !hasCaptionChanged}
                className="bg-blue-primary hover:bg-blue-primary-hover mt-4 text-white font-medium disabled:bg-blue-400 rounded-md px-3 py-1 w-[100px] ml-auto"
                onClick={saveChanges}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal.Box>
    </Modal>
  );
});
