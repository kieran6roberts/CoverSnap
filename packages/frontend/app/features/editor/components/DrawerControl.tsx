import { ActionIcon, Tooltip } from '@mantine/core';
import type { ActionIconProps } from '@mantine/core';

export function DrawerControl({
  children,
  color,
  onClick,
  isActive,
  label,
  ...props
}: ActionIconProps & {
  children: React.ReactNode;
  color: string;
  onClick: () => void;
  label: string;
  isActive: boolean;
}) {
  return (
    <Tooltip
      onClick={onClick}
      aria-label={label}
      label={label}
      position="right"
      color="dark"
      offset={4}
      events={{ hover: true, focus: true, touch: false }}
    >
      <ActionIcon
        variant="filled"
        color={color}
        radius="xl"
        size="xl"
        style={{
          border: isActive ? '2px solid var(--mantine-color-default-color)' : '1px solid var(--mantine-color-body)'
        }}
        onClick={onClick}
        aria-label={label}
        {...props}
      >
        {children}
      </ActionIcon>
    </Tooltip>
  );
}
