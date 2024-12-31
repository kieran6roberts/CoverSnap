import type { MetaFunction } from '@remix-run/node';
import { ColorSchemeToggle } from '~/components/ThemeToggle';
import { Container, Title, Text, Flex, Anchor, Stack, Button, Box } from '@mantine/core';
import { Link } from '@remix-run/react';
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
      <Box component="header" w="100%" py="md" bg="var(--mantine-primary-color-filled)" h={75}>
        <Container size="md">
          <Flex component="nav" justify="space-between" align="center">
            <Anchor size="sm" w={150} fw={500} variant="text" c="white" component={Link} to="/">
              <BrandLogo />
            </Anchor>
            <ColorSchemeToggle />
          </Flex>
        </Container>
      </Box>
      <Container>
        <main>
          <Stack justify="center" gap="xs" align="center" mt="lg">
            <Title ta="center" fz="1.5rem" fw={500}>
              Welcome to{' '}
              <Text inherit component="div" fw={700} w={300}>
                <BrandLogo />
              </Text>
            </Title>
            <Text ta="center" c="dimmed" size="sm">
              Built by{' '}
              <Anchor href={PORTFOLIO_URL} underline="always" target="_blank">
                Kieran Roberts
              </Anchor>
            </Text>
            <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
              CoverSnap lets you avoid getting stuck in design, and generate good looking cover images for your blog
              posts in seconds. It's completely free to use and if you like it, give it a star on GitHub. Enjoy!
            </Text>
            <Flex justify="center" align="center" gap="md" mt="xl">
              <Button component={Link} to="/create" size="md" variant="filled">
                Build for free
              </Button>
              <GitHubStarButton size="md" variant="outline" />
            </Flex>
          </Stack>
        </main>
      </Container>
      <Footer />
    </Stack>
  );
}
