import { ActionIcon, Tooltip } from '@mantine/core';
import type { ActionIconProps } from '@mantine/core';

export function DrawerControl({
  children,
  color,
  onClick,
  label,
  ...props
}: ActionIconProps & {
  children: React.ReactNode;
  color: string;
  onClick: () => void;
  label: string;
}) {
  return (
    <Tooltip label={label} position="right">
      <ActionIcon
        variant="filled"
        color={color}
        radius="md"
        size="lg"
        style={{ borderBottom: '1px solid var(--mantine-color-default-border)' }}
        onClick={onClick}
        aria-label={label}
        {...props}
      >
        {children}
      </ActionIcon>
    </Tooltip>
  );
}
