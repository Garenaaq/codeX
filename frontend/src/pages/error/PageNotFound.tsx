import { useRouteError } from "react-router-dom";

type ErrorType = {
  statusText?: string;
  message: string;
};

export function PageNotFound() {
  const error = useRouteError() as ErrorType;

  return (
    <div id="error-page">
      <h1>Упс!</h1>
      <p>Извините, произошла непредвиденная ошибка.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
