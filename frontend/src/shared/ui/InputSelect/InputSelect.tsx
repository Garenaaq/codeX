import { Select } from "@radix-ui/themes";
import styles from "./inputSelect.module.scss";
import { useField } from "formik";
import { ISelectOptions } from "../../types/selectOptionsType";
import { ErrorMessage } from "../ErrorMessage";
import IFieldsForm from "../../types/fieldsForm";

interface IInputSelectProps extends IFieldsForm {
  options: ISelectOptions[];
}

export function InputSelect({
  id,
  name,
  placeholder,
  options,
}: IInputSelectProps) {
  const [field, meta] = useField(name);

  const { value } = field;

  return (
    <div className={styles.container_role_selector}>
      <label htmlFor={id} className={styles.label}>
        {placeholder}
      </label>
      <Select.Root
        size="3"
        name={name}
        value={value}
        onValueChange={(newValue) =>
          field.onChange({ target: { name, value: newValue } })
        }
      >
        <Select.Trigger
          radius="large"
          placeholder={placeholder}
          id={id}
          className={styles.role_selector}
          onBlur={field.onBlur}
        ></Select.Trigger>
        <Select.Content>
          {options.map((options) => (
            <Select.Item
              key={options.value}
              value={options.value}
              disabled={options.disabled}
            >
              {options.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      {meta.touched && meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
    </div>
  );
}
