import styles from "./authForm.module.scss";
import { Button } from "@radix-ui/themes";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../services/authService";
import { setAuthenticated } from "../../app/store/reducers/userSlice";
import { fieldsAuth } from "./data/formFields";
import { Form, Formik } from "formik";
import { ErrorMessage, InputField } from "../../shared/ui";

const validationSchema = Yup.object().shape({
  nickname: Yup.string().required("Вы не указали логин"),
  password: Yup.string().required("Вы не указали пароль"),
});

export function AuthForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        nickname: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setStatus }) => {
        setStatus("");
        try {
          const data = await login(values);

          if (!data) {
            toast.error("Неверно введены логин или пароль");
            return;
          }

          toast.success(data.message);

          dispatch(
            setAuthenticated({
              id: data.user.id,
              name: data.user.name,
              surname: data.user.surname,
              nickname: data.user.nickname,
              role: data.user.role,
            })
          );

          navigate("/", { replace: true });
        } catch (error) {
          console.log("Ошибка авторизации: ", error);
          setStatus("Неверно введён логин или пароль");
        }
      }}
    >
      {({ isSubmitting, status }) => (
        <Form className={styles.auth_form}>
          {fieldsAuth.map((field) => (
            <InputField
              key={field.id}
              label={field.label}
              id={field.id}
              name={field.name}
              placeholder={field.placeholder}
              type={field.type}
            />
          ))}
          {status && <ErrorMessage>{status}</ErrorMessage>}
          <Button
            variant="soft"
            color="cyan"
            size="3"
            className={styles.auth_form_btn}
            type="submit"
            loading={isSubmitting}
          >
            Войти
          </Button>
          <Link to="/registr" className={styles.auth_form_link}>
            Вы ещё не зарегистрировались?
          </Link>
        </Form>
      )}
    </Formik>
  );
}
