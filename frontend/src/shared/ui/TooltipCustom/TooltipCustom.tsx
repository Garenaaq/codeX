import { Tooltip } from "radix-ui";
import { ReactNode } from "react";
import styles from "./tooltipCustom.module.scss";

interface ITooltipProps {
  children: ReactNode;
  content: string;
}

export function TooltipCustom({ children, content }: ITooltipProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={styles.TooltipContent} sideOffset={5}>
            {content}
            <Tooltip.Arrow className={styles.TooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
