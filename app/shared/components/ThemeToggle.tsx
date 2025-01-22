import { ActionIcon, Box, useMantineColorScheme } from '@mantine/core';
import { SunLight, HalfMoon } from 'iconoir-react';
import { SITE_THEMES } from '~/config/consts';

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={() => setColorScheme(colorScheme === SITE_THEMES.light ? SITE_THEMES.dark : SITE_THEMES.light)}
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
