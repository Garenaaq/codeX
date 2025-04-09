import * as Dialog from "@radix-ui/react-dialog";
import styles from "./projectForm.module.scss";
import { Cross2Icon } from "@radix-ui/react-icons";
import classnames from "classnames";
import { FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { CirclePlus, Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "@radix-ui/themes";
import { IProject } from "../../shared/types/profileType";
import { ProjectFormValuesType } from "./types/projectFormValues";
import {
  useCreateProjectMutation,
  useEditProjectMutation,
} from "./hooks/useProjectFormMutations";
import {
  ErrorMessage,
  InputField,
  InputFile,
  InputTextarea,
  TooltipCustom,
} from "../../shared/ui";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Вы не указали заголовок")
    .max(100, "Заголовок не должен превышать 100 символов"),
  description: Yup.string().max(
    20000,
    "Текст не должен превышать 20000 символов"
  ),
  links: Yup.array()
    .of(
      Yup.string()
        .url("Введите корректный url")
        .required("Ссылка не может быть пустой")
    )
    .min(1, "Вы не указали ссылку на проект")
    .max(3, "Максимум 3 ссылки")
    .required("Вы не указали ссылку на проект"),
});

const initialValues: ProjectFormValuesType = {
  title: "",
  description: "",
  links: [""],
  previewImage: null,
};

interface IProjectFormProps {
  typeForm: "create" | "edit";
  project?: IProject;
}

export function ProjectForm({ typeForm, project }: IProjectFormProps) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const createProjectMutation = useCreateProjectMutation();
  const editProjectMutation = useEditProjectMutation();

  const handleOpenChange = (open: boolean) => {
    setIsOpenModal(open);
  };

  return (
    <Dialog.Root open={isOpenModal} onOpenChange={handleOpenChange}>
      <TooltipCustom
        content={
          typeForm === "create" ? "Создать проект" : "Редактировать проект"
        }
      >
        <Dialog.Trigger asChild>
          {typeForm === "create" ? (
            <CirclePlus className={styles.btn_form} />
          ) : (
            <Pencil width="19" height="19" />
          )}
        </Dialog.Trigger>
      </TooltipCustom>
      {/* <Dialog.Portal> */}
      {/* <Theme scaling="100%" className="radix-theme"> */}
      <Dialog.Overlay className={styles.DialogOverlay} />
      <Dialog.Content className={styles.DialogContent}>
        <Dialog.Title className={styles.DialogTitle}>
          {typeForm === "create"
            ? "Добавление проекта"
            : "Редактирование проекта"}
        </Dialog.Title>
        <Dialog.Description className={styles.DialogDescription}>
          {typeForm === "create"
            ? "Внести данные о своём проекте здесь. Нажмите создать когда закончите."
            : "Внесите изменения в свой проект здесь. Нажмите сохранить когда закончите."}
        </Dialog.Description>
        <Formik
          initialValues={
            typeForm === "edit" && project ? project : initialValues
          }
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values, { resetForm, setStatus }) => {
            if (typeForm === "create") {
              createProjectMutation.mutate(values, {
                onSuccess: () => {
                  setIsOpenModal(false);
                  resetForm();
                },
                onError: () => {
                  setStatus("Ошибка при создании проекта");
                },
              });
            } else if (typeForm === "edit" && project) {
              editProjectMutation.mutate(
                { values, projectId: project._id },
                {
                  onSuccess: () => {
                    setIsOpenModal(false);
                    resetForm();
                  },
                  onError: () => {
                    setStatus("Ошибка при редактировании проекта");
                  },
                }
              );
            }
          }}
        >
          {({ values, status }) => (
            <Form className={styles.project_form}>
              {/* Форма и её поля */}

              <InputField
                id="title"
                name="title"
                placeholder="Заголовок"
                type="text"
                label="Заголовок"
              />
              <InputTextarea
                id="description"
                name="description"
                placeholder="Описание проекта"
                typeInput="default"
                label="Описание проекта"
              />
              {/* Ссылки */}
              <FieldArray name="links">
                {({ remove, push }) => (
                  <div className={styles.links}>
                    <label>Ссылки</label>
                    {values.links.map((_, index) => (
                      <div key={index} className={styles.input_link}>
                        <InputField
                          id={`links[${index}]`}
                          type="text"
                          name={`links[${index}]`}
                          placeholder={`Ссылка ${index + 1}`}
                        />
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => remove(index)}
                          className={styles.btn_form}
                          disabled={values.links.length === 1}
                        >
                          Удалить
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() => push("")}
                      disabled={values.links.length >= 3}
                      className={styles.btn_form}
                    >
                      Добавить ссылку
                    </Button>
                  </div>
                )}
              </FieldArray>

              <InputFile name="previewImage" label="Фото-превью" />

              {status && <ErrorMessage>{status}</ErrorMessage>}

              <div
                style={{
                  display: "flex",
                  marginTop: 25,
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  className={classnames(styles.Button, styles.green)}
                  type="submit"
                  loading={
                    typeForm === "create"
                      ? createProjectMutation.isPending
                      : editProjectMutation.isPending
                  }
                >
                  {typeForm === "create" ? "Создать" : "Сохранить изменения"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <Dialog.Close asChild>
          <button className={styles.IconButton} aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
      {/* </Theme> */}
      {/* </Dialog.Portal> */}
    </Dialog.Root>
  );
}
