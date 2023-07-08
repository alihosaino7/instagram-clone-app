import { FieldValue } from "firebase/firestore";

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

export type ModalType = {
  onClose: () => void;
};

export interface Author {
  id: string;
  username: string;
  avatar: string;
}

export interface IPost {
  likesCount: number;
  commentsCount: number;
  createdAt: FieldValue;
  id: string;
  postImage: string;
  caption: string;
  author: Author;
}

export interface IComment {
  createdAt: FieldValue;
  id: string;
  commentText: string;
  postDocumentId: string;
  author: Author;
}

export interface IUser {
  userImage: string;
  username: string;
  fullName: string;
  userId: string;
  followers: string[];
  following: string[];
  email: string;
}

export interface ILike {
  postDocumentId: string;
  authorId: string;
}

export interface IParent {
  children: React.ReactNode;
  className?: string;
}
