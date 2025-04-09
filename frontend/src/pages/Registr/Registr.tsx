import { Heading } from "@radix-ui/themes";
import styles from "./registr.module.scss";
import { RegistrForm } from "../../features";

export function Registr() {
  return (
    <div className={styles.container}>
      <Heading as="h1" size="7">
        Регистрация
      </Heading>
      <RegistrForm />
    </div>
  );
}
