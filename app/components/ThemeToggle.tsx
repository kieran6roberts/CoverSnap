'use client';

import { ActionIcon, Box, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { SunLight, HalfMoon } from 'iconoir-react';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size={36}
      aria-label="Toggle color scheme"
    >
      <Box darkHidden>
        <SunLight width={16} height={16} color="var(--mantine-color-text)" />
      </Box>
      <Box lightHidden>
        <HalfMoon width={16} height={16} color="var(--mantine-color-text)" />
      </Box>
    </ActionIcon>
  );
}
