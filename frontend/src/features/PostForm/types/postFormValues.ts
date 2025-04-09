import IPost from "../../../shared/types/postType";

export type PostFormValuesType = Omit<
  IPost,
  "id" | "likes" | "userLiked" | "nickname" | "authorId"
>;
