import {
  setAuthenticated,
  setUnauthenticated,
} from "../../store/reducers/userSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { checkTokenValidity } from "../../../services/authService";
import { Loader } from "../../../shared/ui";

export function WrapperRoute() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const data = await checkTokenValidity();
        // console.log(data);
        if (data) {
          dispatch(
            setAuthenticated({
              id: data.user.id,
              name: data.user.name,
              surname: data.user.surname,
              nickname: data.user.nickname,
              role: data.user.role,
            })
          );
        } else {
          dispatch(setUnauthenticated());
        }
      } catch (error) {
        console.error("Ошибка проверки токена:", error);
        dispatch(setUnauthenticated());
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [dispatch]);

  return isLoading ? <Loader /> : <Outlet />;
}
