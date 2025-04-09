import * as Dialog from "@radix-ui/react-dialog";
import styles from "./editProfileForm.module.scss";
import { Cross2Icon } from "@radix-ui/react-icons";
import classnames from "classnames";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { roles } from "../../shared/data/roles";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "@radix-ui/themes";
import { IUserProfile } from "../../shared/types/profileType";
import { useEditProfileMutation } from "./hooks/useEditProfileMutations";
import {
  ErrorMessage,
  InputField,
  InputSelect,
  InputTextarea,
  TooltipCustom,
} from "../../shared/ui";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Имя обязательно"),
  surname: Yup.string().required("Фамилия обязательна"),
  nickname: Yup.string().required("Никнейм обязателен"),
  role: Yup.string().required("Роль обязательна"),
});

interface IEditProfileFormProps {
  profileData: IUserProfile;
}

export function EditProfileForm({ profileData }: IEditProfileFormProps) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const editProfileMutation = useEditProfileMutation();

  const handleOpenChange = (open: boolean) => {
    setIsOpenModal(open);
  };

  return (
    <>
      <Dialog.Root open={isOpenModal} onOpenChange={handleOpenChange}>
        <TooltipCustom content="Редактировать профиль">
          <Dialog.Trigger asChild>
            <Pencil
              width="19"
              height="19"
              className={styles.btn_edit_profile}
            />
          </Dialog.Trigger>
        </TooltipCustom>
        {/* <Dialog.Portal> */}
        {/* <Theme scaling="100%" className="radix-theme"> */}
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>
            Редактирование профиля
          </Dialog.Title>
          <Dialog.Description className={styles.DialogDescription}>
            Внесите изменения в свой профиль. Нажмите сохранить когда закончите
          </Dialog.Description>

          <Formik
            initialValues={{
              name: profileData.name,
              surname: profileData.surname,
              nickname: profileData.nickname,
              role: profileData.role,
              description: profileData.description || "",
              workplace: profileData.workplace || "",
            }}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values, { resetForm, setStatus }) => {
              editProfileMutation.mutate(
                { values },
                {
                  onSuccess: () => {
                    setIsOpenModal(false);
                    resetForm();
                  },
                  onError: () => {
                    setStatus(
                      "Ошибка при редактировании профиля, попробуйте ещё раз"
                    );
                  },
                }
              );
            }}
          >
            {({ status }) => (
              <Form className={styles.edit_form}>
                {/* Форма и её поля */}
                <InputField
                  id="name"
                  name="name"
                  placeholder="Имя"
                  label="Имя"
                  type="text"
                />
                <InputField
                  id="surname"
                  name="surname"
                  placeholder="Фамилия"
                  label="Фамилия"
                  type="text"
                />
                <InputField
                  id="nickname"
                  name="nickname"
                  placeholder="Никнейм"
                  label="Никнейм"
                  type="text"
                />
                <InputSelect
                  id="role"
                  name="role"
                  placeholder="Выберите роль"
                  label="Роль"
                  options={roles}
                />
                <InputTextarea
                  id="description"
                  name="description"
                  placeholder="О себе"
                  label="О себе"
                  typeInput="default"
                />
                <InputField
                  id="workplace"
                  name="workplace"
                  placeholder="Место работы"
                  type="text"
                  label="Место работы"
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
                    loading={editProfileMutation.isPending}
                  >
                    Сохранить изменения
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
    </>
  );
}
