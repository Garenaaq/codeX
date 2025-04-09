import { editProfile } from "../../../services/profileService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditProfileValuesType } from "../types/editProfileValues";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../../../app/store/reducers/userSlice";
import { IUserProfile } from "../../../shared/types/profileType";

export const useEditProfileMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async ({ values }: { values: EditProfileValuesType }) => {
      const data = await editProfile(values);

      return data;
    },
    onSuccess: (data: { message: string; editProfile: IUserProfile }) => {
      queryClient.setQueryData(
        ["userProfile", data.editProfile._id],
        (oldData: { userProfile: IUserProfile }) => {
          if (oldData && oldData.userProfile) {
            return {
              ...oldData,
              userProfile: data.editProfile,
            };
          } else {
            return { userProfile: [data.editProfile] };
          }
        }
      );
      dispatch(
        setAuthenticated({
          id: data.editProfile._id,
          nickname: data.editProfile.nickname,
          name: data.editProfile.name,
          surname: data.editProfile.surname,
          role: data.editProfile.role,
        })
      );
      toast.success(data.message);
    },
  });
};
