import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { memo, useRef, useState } from "react";
import { Alert, Label, FileInput, Textarea } from "flowbite-react";
import { db, storage } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { IoMdClose } from "react-icons/io";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import LoadingLayer from "../common/LoadingLayer";
import { postsActions } from "../../features/post/postsSlice";
import { IPost, ModalType } from "../../types/types";
import { useAppDispatch } from "../../app/hooks";
import { nanoid } from "@reduxjs/toolkit";
import { Modal } from "../common/Modal";

export const CreatePostModal = memo(({ onClose }: ModalType) => {
  const { user } = useAuth();

  const dispatch = useAppDispatch();
  // const show = useAppSelector((state) => state.modal.showCreatePostModal);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const captionRef = useRef<HTMLTextAreaElement>(null);

  async function handleCreatePost() {
    if (!(image && captionRef.current?.value)) {
      return setError("All fields are required");
    }

    setError("");
    setLoading(true);

    const postId = nanoid();

    const storageRef = ref(storage, `posts_images/post-img-${postId}`);
    const uploadedFile = await uploadBytes(storageRef, image);
    const postImageUrl = await getDownloadURL(uploadedFile.ref);

    const newPost: IPost = {
      id: postId,
      createdAt: serverTimestamp(),
      caption: captionRef.current.value,
      postImage: postImageUrl,
      likesCount: 0,
      commentsCount: 0,
      author: {
        id: user?.userId as string,
        username: user?.username as string,
        avatar: user?.userImage as string,
      },
    };

    try {
      await setDoc(doc(collection(db, "posts"), postId), newPost);
      onClose();
      dispatch(postsActions.postAdded({ post: newPost as IPost }));
    } catch (error) {
      console.log(error);
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal>
      <Modal.Box className="w-[600px]">
        {loading && <LoadingLayer className="z-10" />}
        <Modal.Header className="flex items-center justify-between p-4 border-b">
          <h2 className="font-medium text-lg">Create post</h2>
          <button onClick={onClose} className="text-xl text-gray-400">
            <IoMdClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="p-4">
            <form className="flex flex-col gap-4">
              {error && <Alert color="failure">{error}</Alert>}

              <div id="textarea">
                <div className="mb-2 block">
                  <Label htmlFor="caption" value="Caption" />
                </div>
                <Textarea
                  ref={captionRef}
                  id="caption"
                  placeholder="Write a caption..."
                  rows={4}
                />
              </div>
              <div id="fileUpload">
                <div className="mb-2 block">
                  <Label htmlFor="file" value="Upload file" />
                </div>
                <FileInput
                  ref={imageInputRef}
                  accept=".png,.jpg,.jpeg,.webp"
                  id="file"
                  onChange={(e) => setImage(e.target.files?.[0] as File)}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end p-4 border-t">
          <button
            onClick={onClose}
            className="border rounded-md mr-2 py-1 px-4 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            className="bg-blue-primary py-1 rounded-md px-4 hover:bg-blue-primary-hover text-white"
            onClick={handleCreatePost}
            disabled={loading}
          >
            Create
          </button>
        </Modal.Footer>
      </Modal.Box>
    </Modal>
  );
  // document.getElementById("create-post-modal") as HTMLElement
  // );
});
