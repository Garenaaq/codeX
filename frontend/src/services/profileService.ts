import { EditProfileValuesType } from "../features/EditProfileForm/types/editProfileValues";
import { ProjectFormValuesType } from "../features/ProjectForm/types/projectFormValues";
import { IGetProfileResponse } from "../shared/types/profileType";
import { handleApiError } from "./apiHelpers";

const API_URL: string = "/api/profile";

export const getProfile = async (
  userId: string | undefined
): Promise<IGetProfileResponse> => {
  try {
    const response = await fetch(`${API_URL}/getProfile/${userId}`);

    const data: IGetProfileResponse = await response.json();

    if (!response.ok)
      throw new Error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Неизвестная ошибка"
    );
  }
};

export const editProfile = async (values: EditProfileValuesType) => {
  try {
    const response = await fetch(`${API_URL}/editProfile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok) {
      await handleApiError(response);
    }

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Неизвестная ошибка"
    );
  }
};

export const createProject = async (values: ProjectFormValuesType) => {
  try {
    const response = await fetch(`${API_URL}/createProject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok) {
      await handleApiError(response);
    }

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Неизвестная ошибка"
    );
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const response = await fetch(
      `${API_URL}/deleteProject?projectId=${projectId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();

    if (!response.ok) {
      await handleApiError(response);
    }

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Неизвестная ошибка"
    );
  }
};

export const editProject = async (
  editProject: ProjectFormValuesType,
  projectId: string
) => {
  try {
    const newValues = {
      ...editProject,
      projectId,
    };
    const response = await fetch(`${API_URL}/editProject`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newValues),
    });

    const data = await response.json();

    if (!response.ok) {
      await handleApiError(response);
    }

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Неизвестная ошибка"
    );
  }
};

export const getProject = async (userId?: string, projectId?: string) => {
  try {
    const response = await fetch(
      `${API_URL}/users/${userId}/project/${projectId}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Произошла ошибка. Пожалуйста, попробуйте еще раз."
      );
    }

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Неизвестная ошибка"
    );
  }
};
