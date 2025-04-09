import { useField } from "formik";
import styles from "./inputFile.module.scss";

interface IInputFileProps {
  name: string;
  label: string;
}

export function InputFile({ label, ...props }: IInputFileProps) {
  const [field] = useField(props);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        field.onChange({
          target: { name: field.name, value: reader.result as string },
        });
      };

      reader.readAsDataURL(file);
    } else {
      field.onChange({ target: { name: field.name, value: "" } });
    }
  };

  return (
    <label className={styles.input_file}>
      {label}
      <input type="file" onChange={handleChange} accept="image/*" />
    </label>
  );
}
