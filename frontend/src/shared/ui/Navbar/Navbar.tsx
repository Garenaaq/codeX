import { NavLink } from "react-router-dom";
import styles from "./navbar.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";

export function Navbar() {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <nav className={styles.navbar}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? styles.active_link : styles.inactive_link
        }
      >
        Главная
      </NavLink>
      {user && (
        <NavLink
          to={`/users/${user.id}`}
          className={({ isActive }) =>
            isActive ? styles.active_link : styles.inactive_link
          }
        >
          Профиль
        </NavLink>
      )}
    </nav>
  );
}
