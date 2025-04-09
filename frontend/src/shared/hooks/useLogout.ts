import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout as authLogout } from "../../services/authService";
import { setUnauthenticated } from "../../app/store/reducers/userSlice";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    try {
      await authLogout();
      dispatch(setUnauthenticated());
      navigate("/login");
    } catch (error) {
      console.error("Ошибка при выходе: ", error);
    }
  }, [dispatch, navigate]);

  return logout;
};
