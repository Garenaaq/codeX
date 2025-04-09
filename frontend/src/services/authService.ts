const API_URL: string = "/api/auth";

export const login = async (values: { nickname: string; password: string }) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Произошла ошибка. Пожалуйста, попробуйте еще раз."
      );
    }

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Неизвестная ошибка."
    );
  }
};

interface IRegisterValues {
  name: string;
  surname: string;
  nickname: string;
  email: string;
  password: string;
  role: string;
}

export const register = async (values: IRegisterValues) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Произошла ошибка. Пожалуйста, попробуйте еще раз."
      );
    }

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Неизвестная ошибка."
    );
  }
};

interface ITokenValidityResponse {
  user: {
    id: string;
    nickname: string;
    name: string;
    surname: string;
    role:
      | "Frontend Developer"
      | "Backend Developer"
      | "QA Engineer"
      | "Designer"
      | "Manager"
      | "HR";
  };
}

export const logout = async () => {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Неизвестная ошибка."
    );
  }
};

export const checkTokenValidity =
  async (): Promise<ITokenValidityResponse | null> => {
    try {
      const response = await fetch(`${API_URL}/checkSession`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const response = await fetch(`${API_URL}/refreshToken`, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          return null;
        }
      }
    } catch (error) {
      console.error("Ошибка при проверке токена:", error);
      return null;
    }
  };
