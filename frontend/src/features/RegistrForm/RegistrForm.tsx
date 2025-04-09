import { fieldsRegistr } from "./data/formFields";
import styles from "./registrForm.module.scss";
import { Button } from "@radix-ui/themes";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { register } from "../../services/authService";
import { Form, Formik } from "formik";
import { roles } from "../../shared/data/roles";
import { InputField, InputSelect } from "../../shared/ui";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Имя обязательно"),
  surname: Yup.string().required("Фамилия обязательна"),
  nickname: Yup.string().required("Никнейм обязателен"),
  email: Yup.string()
    .email("Некорректный формат электронной почты")
    .required("Электронная почта обязательна"),
  password: Yup.string()
    .required("Пароль обязателен")
    .min(8, "Пароль должен содержать минимум 8 символов")
    .matches(/[a-zA-Z]/, "Пароль должен содержать буквы")
    .matches(/\d/, "Пароль должен содержать цифры"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Пароли должны совпадать")
    .required("Подтверждение пароля обязательно"),
  role: Yup.string().required("Роль обязательна"),
});

export function RegistrForm() {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        name: "",
        surname: "",
        nickname: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          const data = await register(values);

          if (!data) {
            toast.error("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
            return;
          }

          toast.success(data.message);

          navigate("/login", { replace: true });
        } catch (error) {
          console.error("Ошибка: ", error);
          toast.error(
            error instanceof Error
              ? error.message
              : "Произошла ошибка. Пожалуйста, попробуйте еще раз."
          );
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.reg_form}>
          {fieldsRegistr.map((field) =>
            field.name !== "role" ? (
              <InputField
                key={field.id}
                label={field.label}
                id={field.id}
                name={field.name}
                placeholder={field.placeholder}
                type={field.type}
              />
            ) : (
              <InputSelect
                key={field.id}
                label={field.label}
                id={field.id}
                name={field.name}
                placeholder={field.placeholder}
                options={roles}
              />
            )
          )}
          <Button
            variant="soft"
            color="indigo"
            size="3"
            className={styles.reg_form_btn}
            type="submit"
            loading={isSubmitting}
          >
            Создать аккаунт
          </Button>
          <p>
            Уже зарегистрированы?{" "}
            <Link to="/login" className={styles.reg_form_link}>
              Войти
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}
