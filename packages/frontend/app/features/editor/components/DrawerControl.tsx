import { ActionIcon, createPolymorphicComponent, Tooltip, Indicator } from '@mantine/core';
import type { ActionIconProps } from '@mantine/core';

interface DrawerControlProps extends ActionIconProps {
  children: React.ReactNode;
  value: string;
  label: string;
  isActive: boolean;
}

export const DrawerControl = createPolymorphicComponent<'button', DrawerControlProps>(
  ({ children, isActive, label, value, ...props }: DrawerControlProps) => {
    return (
      <Tooltip
        aria-label={label}
        label={label}
        position="right"
        color="dark"
        offset={4}
        events={{ hover: true, focus: true, touch: false }}
      >
        <Indicator disabled={!isActive} offset={7} color="grape.5" withBorder>
          <ActionIcon
            variant={isActive ? 'filled' : 'light'}
            value={value}
            radius="xl"
            size="xl"
            style={{
              border: isActive ? '2px solid var(--mantine-color-default-color)' : 'transparent',
              justifyContent: 'center'
            }}
            aria-label={label}
            {...props}
          >
            {children}
          </ActionIcon>
        </Indicator>
      </Tooltip>
    );
  }
);
