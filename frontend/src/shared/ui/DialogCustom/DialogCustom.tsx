import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "./dialogCustom.module.scss";
import classnames from "classnames";
import { Link } from "@radix-ui/themes";

interface IDialogCustom {
  children: React.ReactNode;
  content: string;
  typeDialog: "login";
}

export function DialogCustom({ children, content, typeDialog }: IDialogCustom) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>
            {typeDialog === "login" && <>Необходимо авторизоваться</>}
          </Dialog.Title>
          <Dialog.Description className={styles.DialogDescription}>
            {content}
          </Dialog.Description>
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <Link
                className={classnames(styles.Button, styles.green)}
                href="/login"
              >
                {typeDialog === "login" && <>Авторизоваться</>}
              </Link>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className={styles.IconButton} aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
