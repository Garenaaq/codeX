import { AlertDialog } from "radix-ui";
import styles from "./modalCustom.module.scss";
import { Trash } from "lucide-react";
import { Button } from "@radix-ui/themes";
import classname from "classnames";
import { TooltipCustom } from "../TooltipCustom";

interface IModalCustom {
  confirmAction: () => void;
  typeModal: "delete" | "login";
  isLoading: boolean;
  itemType: string;
}

export function ModalCustom({
  confirmAction,
  typeModal,
  isLoading,
  itemType,
}: IModalCustom) {
  return (
    <AlertDialog.Root>
      <TooltipCustom content="Удалить">
        <AlertDialog.Trigger asChild>
          {typeModal === "delete" ? <Trash width="19" height="19" /> : <></>}
        </AlertDialog.Trigger>
      </TooltipCustom>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.AlertDialogOverlay} />
        <AlertDialog.Content className={styles.AlertDialogContent}>
          <AlertDialog.Title className={styles.AlertDialogTitle}>
            {typeModal === "delete" && (
              <>Вы уверены, что хотите удалить {itemType}?</>
            )}
          </AlertDialog.Title>
          <AlertDialog.Description className={styles.AlertDialogDescription}>
            {typeModal === "delete" && (
              <>
                Это действие нельзя будет отменить. Все данные, связанные с
                {` ${itemType}ом`}, будут удалены без возможности
                восстановления.
              </>
            )}
          </AlertDialog.Description>
          <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
            <AlertDialog.Cancel asChild>
              <Button className={classname(styles.Button, styles.mauve)}>
                Отменить
              </Button>
            </AlertDialog.Cancel>
            {/* <AlertDialog.Action asChild> */}
            <Button
              onClick={confirmAction}
              loading={isLoading}
              className={classname(styles.Button, styles.red)}
            >
              Подтвердить
            </Button>
            {/* </AlertDialog.Action> */}
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
