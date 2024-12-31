import type { MetaFunction } from '@remix-run/node';
import { Container, Title, Text, Flex, Anchor, Stack, Button, Box, Card, Image, Group } from '@mantine/core';
import { Link } from '@remix-run/react';

import { ColorSchemeToggle } from '~/components/ThemeToggle';
import { BrandLogo } from '~/components/BrandLogo';
import { Footer } from '~/components/Layout/Footer';
import { PORTFOLIO_URL } from '~/consts';
import { GitHubStarButton } from '~/components/GitHubStarButton';

export const meta: MetaFunction = () => {
  return [
    { title: 'CoverSnap' },
    {
      name: 'description',
      content: 'CoverSnap lets you easily generate good looking cover images for your blog posts.'
    }
  ];
};

export default function Index() {
  return (
    <Stack h="100vh" justify="space-between">
      <Box component="header" w="100%" py="md" bg="var(--mantine-primary-color-filled)">
        <Container size="md">
          <Flex component="nav" justify="space-between" align="center">
            <Anchor size="sm" w={125} fw={500} variant="text" c="white" component={Link} to="/">
              <BrandLogo />
            </Anchor>
            <ColorSchemeToggle />
          </Flex>
        </Container>
      </Box>
      <Container>
        <main>
          <Flex direction={{ base: 'column', md: 'row' }} align={{ base: 'flex-start', md: 'center' }} gap="xl">
            <Stack justify="center" gap="xs" mt="lg">
              <Title ta="center" fz="1.5rem" fw={500} aria-label="CoverSnap">
                <Text inherit component="div" fw={700} w={300}>
                  <BrandLogo />
                </Text>
              </Title>
              <Text c="dimmed" size="sm">
                Built by{' '}
                <Anchor href={PORTFOLIO_URL} underline="always" target="_blank">
                  Kieran Roberts
                </Anchor>
              </Text>
              <Text c="dimmed" size="lg" maw={580} mx="auto" mt="xl">
                CoverSnap lets you avoid getting stuck in design by generating great looking cover images for your blog
                posts in seconds. It's completely free to use and if you like it, give it a star on GitHub. Enjoy!
              </Text>
              <Flex direction={{ base: 'column', sm: 'row' }} justify="flex-start" align="center" gap="md" mt="xl">
                <Button hiddenFrom="sm" component={Link} to="/create" size="md" variant="filled" fullWidth>
                  Build for free
                </Button>
                <Button visibleFrom="sm" component={Link} to="/create" size="md" variant="filled">
                  Build for free
                </Button>
                <GitHubStarButton hiddenFrom="sm" size="md" variant="light" isFullWidth />
                <GitHubStarButton visibleFrom="sm" size="md" variant="light" />
              </Flex>
            </Stack>
            <Card shadow="sm" padding="md" radius="md" style={{ width: '100%', maxWidth: 500 }} withBorder>
              <Card.Section>
                <Image
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>My Clean Code Principles</Text>
              </Group>
              <Text c="dimmed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Donec id elit non mi porta
                gravida at eget metus.
              </Text>
            </Card>
          </Flex>
        </main>
      </Container>
      <Footer />
    </Stack>
  );
}
