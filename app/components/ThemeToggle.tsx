'use client';

import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { SunLight, HalfMoon } from 'iconoir-react';

const LIGHT_THEME = 'light';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      {computedColorScheme === LIGHT_THEME ? (
        <SunLight width={16} height={16} color="var(--mantine-color-text)" />
      ) : (
        <HalfMoon width={16} height={16} color="var(--mantine-color-text)" />
      )}
    </ActionIcon>
  );
}
