import { Button } from "@radix-ui/themes";
import styles from "./header.module.scss";
import { useSelector } from "react-redux";
import { Logo, Navbar } from "../../shared/ui";
import toast from "react-hot-toast";
import { RootState } from "../../app/store/store";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../shared/hooks/useLogout";

export function Header() {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      console.log("Произошла ошибка при выходе из системы: ", error);
      toast.error("Произошла ошибка, попробуйте ещё раз");
    }
  };

  return (
    <header className={styles.header}>
      <Logo />
      <Navbar />

      {user ? (
        <Button
          variant="soft"
          color="crimson"
          size="3"
          className={styles.header_btn_logout}
          onClick={handleLogout}
        >
          Выйти
        </Button>
      ) : (
        <Button
          variant="soft"
          color="indigo"
          size="3"
          className={styles.header_btn_logout}
          onClick={handleLogin}
        >
          Войти
        </Button>
      )}
    </header>
  );
}
