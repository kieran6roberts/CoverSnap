import { ActionIcon, createPolymorphicComponent, Text, Stack } from '@mantine/core';
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
      <Stack align="center" gap={4}>
        <ActionIcon
          variant={isActive ? 'light' : 'subtle'}
          value={value}
          radius="xl"
          size="xl"
          style={{
            justifyContent: 'center'
          }}
          aria-label={label}
          {...props}
        >
          {children}
        </ActionIcon>

        <Text size="xs" ta="center">
          {label}
        </Text>
      </Stack>
    );
  }
);
