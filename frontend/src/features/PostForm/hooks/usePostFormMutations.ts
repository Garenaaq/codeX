import { useMutation } from "@tanstack/react-query";
import { createPost, editPost } from "../../../services/postService";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import IPost from "../../../shared/types/postType";
import { PostFormValuesType } from "../types/postFormValues";
import { useFilterContext } from "../../../app/context/FilterContext";

const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  const { filters } = useFilterContext();

  return useMutation({
    mutationFn: async ({ values }: { values: PostFormValuesType }) => {
      const data = await createPost(values);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts", filters] });
      toast.success(data.message);
    },
  });
};

const useEditPostMutation = () => {
  const queryClient = useQueryClient();
  const { filters } = useFilterContext();

  return useMutation({
    mutationFn: async ({
      values,
      idPost,
    }: {
      values: PostFormValuesType;
      idPost: string; // idPost обязателен для редактирования
    }) => {
      const data = await editPost(values, idPost);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["posts", filters],
        (oldData: { posts: IPost[] }) => {
          if (oldData && oldData.posts) {
            return {
              ...oldData,
              posts: oldData.posts.map((post) =>
                post.id === data.post.id ? data.post : post
              ),
            };
          } else {
            return { posts: [data.post] };
          }
        }
      );
      toast.success(data.message);
    },
  });
};

export { useCreatePostMutation, useEditPostMutation };
