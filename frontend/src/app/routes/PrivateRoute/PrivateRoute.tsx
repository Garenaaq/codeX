import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface IPrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: IPrivateRouteProps) {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
