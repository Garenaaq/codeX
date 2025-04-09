import * as Dialog from "@radix-ui/react-dialog";
import styles from "./postForm.module.scss";
import { Cross2Icon } from "@radix-ui/react-icons";
import classnames from "classnames";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { CirclePlus, Pencil } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store/store";
import { useState } from "react";
import IPost from "../../shared/types/postType";
import { Button, Theme } from "@radix-ui/themes";
import {
  useCreatePostMutation,
  useEditPostMutation,
} from "./hooks/usePostFormMutations";
import { PostFormValuesType } from "./types/postFormValues";
import {
  ErrorMessage,
  InputField,
  InputFile,
  InputSelect,
  InputTextarea,
  TooltipCustom,
} from "../../shared/ui";
import { roles } from "../../shared/data/roles";
import { typePost } from "../../shared/data/typePost";
import { useLogout } from "../../shared/hooks/useLogout";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Вы не указали заголовок")
    .max(100, "Заголовок не должен превышать 100 символов"),
  content: Yup.string()
    .required("Вы не указали текст")
    .max(20000, "Текст не должен превышать 20000 символов"),
  direction: Yup.string().required("Вы не указали направление"),
  type: Yup.string().required("Вы не указали тип"),
});

const initialValues: PostFormValuesType = {
  title: "",
  content: "",
  previewImage: null,
  direction: "",
  type: "",
};

interface IPostFormProps {
  typeForm: "create" | "edit";
  post?: IPost;
}

export function PostForm({ typeForm, post }: IPostFormProps) {
  const { user } = useSelector((state: RootState) => state.user);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const logout = useLogout();

  const createPostMutation = useCreatePostMutation();
  const editPostMutation = useEditPostMutation();

  const handleOpenChange = (open: boolean) => {
    setIsOpenModal(open);
  };

  return (
    <>
      <Dialog.Root open={isOpenModal} onOpenChange={handleOpenChange}>
        <TooltipCustom
          content={
            typeForm === "create" ? "Создать пост" : "Редактировать пост"
          }
        >
          <Dialog.Trigger asChild>
            {typeForm === "create" ? (
              <CirclePlus className={styles.btn_create_post} />
            ) : (
              <Pencil width="19" height="19" />
            )}
          </Dialog.Trigger>
        </TooltipCustom>
        <Dialog.Portal>
          <Theme scaling="100%" className="radix-theme">
            <Dialog.Overlay className={styles.DialogOverlay} />
            <Dialog.Content className={styles.DialogContent}>
              <Dialog.Title className={styles.DialogTitle}>
                {typeForm === "create"
                  ? "Создание поста"
                  : "Редактирование поста"}
              </Dialog.Title>
              <Dialog.Description className={styles.DialogDescription}>
                {typeForm === "create"
                  ? "Внести данные о своём посте здесь. Нажмите создать когда закончите."
                  : "Внесите изменения в свой пост здесь. Нажмите сохранить когда закончите."}
              </Dialog.Description>

              {/* Форма и её поля */}
              <Formik
                initialValues={
                  typeForm === "edit" && post ? post : initialValues
                }
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values, { resetForm, setStatus }) => {
                  if (user) {
                    if (typeForm === "create") {
                      createPostMutation.mutate(
                        { values },
                        {
                          onSuccess: () => {
                            setIsOpenModal(false);
                            resetForm();
                          },
                          onError: () => {
                            setStatus(
                              "Ошибка при создании поста, попробуйте ещё раз"
                            );
                          },
                        }
                      );
                    } else if (typeForm === "edit" && post) {
                      editPostMutation.mutate(
                        { values, idPost: post.id },
                        {
                          onSuccess: () => {
                            setIsOpenModal(false);
                            resetForm();
                          },
                          onError: () => {
                            setStatus(
                              "Ошибка при редактировании поста, попробуйте ещё раз"
                            );
                          },
                        }
                      );
                    }
                  }
                }}
              >
                {({ status }) => (
                  <Form className={styles.post_form}>
                    <InputField
                      label="Заголовок"
                      placeholder="Заголовок"
                      id="title"
                      name="title"
                      type="text"
                    />

                    <InputTextarea
                      id="content"
                      name="content"
                      placeholder="Текст"
                      label="Текст"
                      typeInput="markdown"
                    />

                    <InputFile name="previewImage" label="Фото-превью" />

                    <InputSelect
                      id="direction"
                      name="direction"
                      placeholder="Направление"
                      label="Направление"
                      options={roles}
                    />

                    <InputSelect
                      id="type"
                      name="type"
                      label="Тпи поста"
                      placeholder="Тип поста"
                      options={typePost}
                    />
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
                            ? createPostMutation.isPending
                            : editPostMutation.isPending
                        }
                      >
                        {typeForm === "create"
                          ? "Создать"
                          : "Сохранить изменения"}
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
          </Theme>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
