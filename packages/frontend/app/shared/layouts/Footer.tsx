import { Anchor, Box, Container, Stack, Text } from '@mantine/core';

import { GITHUB_URL, SITE_NAME } from '~/config/consts';

export function Footer() {
  return (
    <Box component="footer" w="100%" py="xl">
      <Container size="xl">
        <Stack gap="xs" justify="center" align="center">
          <Text ta="center" size="sm">
            {SITE_NAME} on{' '}
            <Anchor href={GITHUB_URL} underline="always" target="_blank">
              GitHub
            </Anchor>
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
