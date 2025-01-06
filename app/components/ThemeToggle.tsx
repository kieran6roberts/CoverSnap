'use client';

import { ActionIcon, Box, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { SunLight, HalfMoon } from 'iconoir-react';
import { SITE_THEMES } from '~/consts';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme(SITE_THEMES.light, { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === SITE_THEMES.light ? SITE_THEMES.dark : SITE_THEMES.light)}
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
