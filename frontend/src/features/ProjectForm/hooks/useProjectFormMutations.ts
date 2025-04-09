import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ProjectFormValuesType } from "../types/projectFormValues";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { createProject, editProject } from "../../../services/profileService";
import { IUserProfile } from "../../../shared/types/profileType";

export const useCreateProjectMutation = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: ProjectFormValuesType) => {
      const data = await createProject(values);
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
                portfolio: [data.project, ...oldData.userProfile.portfolio],
              },
            };
          }
          return oldData;
        }
      );
      toast.success(data.message);
    },
  });
};

export const useEditProjectMutation = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      values,
      projectId,
    }: {
      values: ProjectFormValuesType;
      projectId: string;
    }) => {
      const data = await editProject(values, projectId);

      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["userProfile", user?.id],
        (oldData: { message: string; userProfile: IUserProfile }) => {
          if (oldData && oldData.userProfile) {
            const projectIndex = oldData.userProfile.portfolio.findIndex(
              (project) => project._id === data.editProject._id
            );

            const updatedPortfolio = [...oldData.userProfile.portfolio];
            updatedPortfolio[projectIndex] = data.editProject;

            return {
              ...oldData,
              userProfile: {
                ...oldData.userProfile,
                portfolio: updatedPortfolio,
              },
            };
          }
          return oldData;
        }
      );
      toast.success(data.message);
    },
  });
};
