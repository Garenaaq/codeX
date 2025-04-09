import { PostFormValuesType } from "../features/PostForm/types/postFormValues";
import { IGetPostsResponse } from "../shared/types/postType";
import { handleApiError } from "./apiHelpers";

const API_URL: string = "/api/post";

export const createPost = async (values: PostFormValuesType) => {
  try {
    const response = await fetch(`${API_URL}/createPost`, {
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
      error instanceof Error ? error.message : "Неизвестная ошибка."
    );
  }
};

export const getPosts = async (filters: {
  direction: string;
  type: string;
}): Promise<IGetPostsResponse> => {
  try {
    const queryString = new URLSearchParams(filters).toString();

    const response = await fetch(`${API_URL}/getPosts?${queryString}`);

    const data: IGetPostsResponse = await response.json();

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Неизвестная ошибка"
    );
  }
};

export const deletePost = async (idPost: string) => {
  try {
    const response = await fetch(`${API_URL}/deletePost?id=${idPost}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      await handleApiError(response);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Неизвестная ошибка"
    );
  }
};

export const editPost = async (values: PostFormValuesType, idPost: string) => {
  try {
    const response = await fetch(`${API_URL}/editPost?id=${idPost}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      await handleApiError(response);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Неизвестная ошибка"
    );
  }
};

export const likePost = async (idPost: string, userId: string) => {
  try {
    const response = await fetch(`${API_URL}/likePost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idPost, userId }),
    });

    if (!response.ok) {
      await handleApiError(response);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Неизвестная ошибка"
    );
  }
};
