export default interface IFieldsForm {
  id: string;
  placeholder: string;
  label?: string;
  type?: "text" | "password" | "email";
  name: string;
}
