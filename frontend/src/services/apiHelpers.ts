export const handleApiError = (response: Response) => {
  if (response.status === 403) {
    window.location.href = "/login";
    throw new Error("Доступ запрещен. Пожалуйста, войдите в систему.");
  } else {
    return response.json().then((errorData) => {
      throw new Error(errorData.error || "Неизвестная ошибка");
    });
  }
};
