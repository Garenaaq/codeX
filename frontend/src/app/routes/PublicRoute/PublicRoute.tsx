import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../store/store";

interface IPublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: IPublicRouteProps) {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return children;
  }

  return <Navigate to="/" replace />;
}
