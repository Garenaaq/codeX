import { ReactNode } from "react";
import styles from "./errorMessage.module.scss";

interface IErrorMessageProps {
  children: ReactNode;
}

export function ErrorMessage({ children }: IErrorMessageProps) {
  return <span className={styles.error_message}>{children}</span>;
}
