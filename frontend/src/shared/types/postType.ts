export default interface IPost {
  id: string;
  title: string;
  content: string;
  previewImage: string | null;
  direction: string;
  type: string;
  nickname: string;
  authorId: string;
  likes: number;
  userLiked: boolean;
}

export interface IGetPostsResponse {
  posts: IPost[];
}
