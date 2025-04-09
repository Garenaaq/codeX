import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost, likePost } from "../../../services/postService";
import toast from "react-hot-toast";
import IPost from "../../../shared/types/postType";
import { useFilterContext } from "../../../app/context/FilterContext";

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  const { filters } = useFilterContext();

  return useMutation({
    mutationFn: async (id: string) => {
      const data = await deletePost(id);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts", filters] });
      toast.success(data.message);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Ошибка при удалении поста, попробуйте ещё раз");
    },
  });
};

export const useLikePostMutation = () => {
  const queryClient = useQueryClient();
  const { filters } = useFilterContext();

  return useMutation({
    mutationFn: async ({
      idPost,
      userId,
    }: {
      idPost: string;
      userId: string;
    }) => {
      const data = await likePost(idPost, userId);
      return data;
    },
    onSuccess: (data, { idPost }) => {
      queryClient.setQueryData(
        ["posts", filters],
        (oldData: { posts: IPost[] }) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            posts: oldData.posts.map((post) =>
              post.id === idPost
                ? {
                    ...post,
                    likes: data.removeLike ? post.likes - 1 : post.likes + 1,
                    userLiked: data.removeLike ? false : true,
                  }
                : post
            ),
          };
        }
      );
    },
    onError: () => {
      toast.error("Ошибка при лайке поста, попробуйте ещё раз");
    },
  });
};
