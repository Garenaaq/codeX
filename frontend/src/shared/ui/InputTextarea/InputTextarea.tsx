import ReactMarkdown from "react-markdown";
import styles from "./inputTextarea.module.scss";
import { ErrorMessage } from "../ErrorMessage";
import { useField } from "formik";
import classnames from "classnames";
import { Text } from "@radix-ui/themes";
import { Info } from "lucide-react";

interface IInputMarkdownProps {
  id: string;
  placeholder: string;
  label: string;
  name: string;
  typeInput: "default" | "markdown";
}

export function InputTextarea({
  id,
  placeholder,
  label,
  typeInput,
  ...props
}: IInputMarkdownProps) {
  const [field, meta] = useField(props);

  return (
    <div className={styles.markdown_container}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        {...field}
        className={classnames(styles.textarea, {
          [styles.error]: meta.touched && meta.error,
        })}
        placeholder={placeholder}
      />
      {typeInput === "markdown" && (
        <div className={styles.markdown_info}>
          <Info width="30" height="30" />
          <Text as="span" size="2">
            Используйте Markdown для форматирования: **жирный**, *курсив*.
          </Text>
        </div>
      )}
      {meta.touched && meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
      {typeInput === "markdown" && (
        <div className={styles.preview}>
          <ReactMarkdown>{field.value}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
