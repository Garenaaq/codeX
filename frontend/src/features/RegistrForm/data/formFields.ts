import IFieldsForm from "../../../shared/types/fieldsForm";

export const fieldsRegistr: IFieldsFormAuth[] = [
  { id: "name", label: "Имя", placeholder: "", type: "text", name: "name" },
  {
    id: "surname",
    label: "Фамилия",
    placeholder: "",
    type: "text",
    name: "surname",
  },
  {
    id: "nickname",
    label: "Никнейм",
    placeholder: "",
    type: "text",
    name: "nickname",
  },
  {
    id: "email",
    label: "Электронная почта",
    placeholder: "example@mail.ru",
    type: "email",
    name: "email",
  },
  {
    id: "password",
    label: "Пароль",
    placeholder: "",
    type: "password",
    name: "password",
  },
  {
    id: "confirmPassword",
    label: "Подтверждение пароля",
    placeholder: "",
    type: "password",
    name: "confirmPassword",
  },
  {
    id: "role",
    label: "Выберите роль",
    placeholder: "Выберите роль",
    type: "text",
    name: "role",
  },
];
