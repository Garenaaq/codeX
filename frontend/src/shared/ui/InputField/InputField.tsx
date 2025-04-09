import styles from "./inputField.module.scss";
import { TextField } from "@radix-ui/themes";
import cn from "classnames";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useField } from "formik";
import { ErrorMessage } from "../ErrorMessage";
import IFieldsForm from "../../types/fieldsForm";

export function InputField({
  id,
  placeholder,
  type,
  label,
  ...props
}: IFieldsForm) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [field, meta] = useField(props);

  return (
    <div className={styles.container_input_field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.input_wrapper}>
        <TextField.Root
          size="3"
          id={id}
          {...field}
          className={cn(styles.input_field, {
            [styles.error]: meta.touched && meta.error,
          })}
          type={isPasswordVisible && type === "password" ? "text" : type}
          placeholder={placeholder}
          variant="soft"
          color="indigo"
        >
          {type === "password" && (
            <button
              type="button"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              className={styles.eyeIconButton}
            >
              {isPasswordVisible ? <Eye /> : <EyeOff />}
            </button>
          )}
        </TextField.Root>
      </div>
      {meta.touched && meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
    </div>
  );
}
