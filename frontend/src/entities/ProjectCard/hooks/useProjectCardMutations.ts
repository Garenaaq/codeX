import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { deleteProject } from "../../../services/profileService";
import { IUserProfile } from "../../../shared/types/profileType";

export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state: RootState) => state.user);

  return useMutation({
    mutationFn: async (idProject: string) => {
      const data = await deleteProject(idProject);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["userProfile", user?.id],
        (oldData: { message: string; userProfile: IUserProfile }) => {
          if (oldData && oldData.userProfile) {
            return {
              ...oldData,
              userProfile: {
                ...oldData.userProfile,
                portfolio: oldData.userProfile.portfolio.filter(
                  (project) => project._id !== data.deleteProjectId
                ),
              },
            };
          }
          return oldData;
        }
      );
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Ошибка при удалении проекта, попробуйте ещё раз");
    },
  });
};
