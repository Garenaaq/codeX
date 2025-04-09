import { Heading } from "@radix-ui/themes";
import styles from "./login.module.scss";
import { AuthForm } from "../../features";

export function Login() {
  return (
    <div className={styles.container}>
      <Heading as="h1" size="7">
        Авторизация
      </Heading>
      <AuthForm />
    </div>
  );
}
