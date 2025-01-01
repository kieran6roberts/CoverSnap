import type { MetaFunction } from '@remix-run/node';
import { Container, Title, Text, Flex, Anchor, Stack, Button, Box, Image, Mark } from '@mantine/core';
import { Link } from '@remix-run/react';

import { ColorSchemeToggle } from '~/components/ThemeToggle';
import { Footer } from '~/components/Layout/Footer';
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

const heroImages = {
  light: '/public/hero-light.png',
  dark: '/public/hero-dark.png'
} as const;

export default function Index() {
  return (
    <>
      <Box component="header" w="100%" py="md">
        <Container size="lg">
          <Flex component="nav" justify="space-between" align="center">
            <Anchor size="sm" fz={{ base: '1.3rem', sm: '1.5rem' }} fw={500} variant="text" component={Link} to="/">
              CoverSnap
            </Anchor>
            <ColorSchemeToggle />
          </Flex>
        </Container>
      </Box>
      <Container component="main" size="xl">
        <Flex direction="column" gap="xl" align="center" mt={{ base: 80, sm: 100 }}>
          <Stack justify="center" gap="xs">
            <Title
              ta="center"
              fz={{ base: '2.4rem', sm: '4rem' }}
              style={{ lineHeight: '1', zIndex: 1 }}
              fw={700}
              aria-label="CoverSnap"
              maw={{ base: 500, sm: 700 }}
              mx="auto"
            >
              Publish articles{' '}
              <Mark fz="0.95em" style={{ zIndex: -1 }}>
                faster
              </Mark>{' '}
              without cover design mental block
            </Title>

            <Text c="dimmed" fz={{ base: 'md', sm: 'lg' }} ta="center" maw={580} mx="auto" mt="md">
              CoverSnap can help you create great looking cover images for your blog posts in seconds using simple
              editing tools. It's completely free to use! Give it a star on GitHub if you found it useful. Enjoy.
            </Text>
            <Flex direction={{ base: 'column', sm: 'row' }} justify="center" align="center" gap="md" mt="xl">
              <Button hiddenFrom="sm" component={Link} to="/create" size="lg" variant="filled">
                Build for free
              </Button>
              <Button visibleFrom="sm" component={Link} to="/create" size="lg" variant="filled">
                Build for free
              </Button>
              <GitHubStarButton hiddenFrom="sm" size="md" variant="light" />
              <GitHubStarButton visibleFrom="sm" size="md" variant="light" />
            </Flex>
          </Stack>
          <Box
            style={{
              border: '1px solid var(--mantine-color-default-border)',
              borderRadius: 'var(--mantine-radius-md)',
              boxShadow: 'var(--mantine-shadow-sm)',
              maxWidth: '1200px',
              maxHeight: '700px',
              width: '100%',
              height: '100%'
            }}
            mt="xl"
            mb={{ base: 50, sm: 100 }}
          >
            <Image src={heroImages['dark']} alt="CoverSnap create page screenshot" radius="md" loading="eager" />
          </Box>
        </Flex>
      </Container>
      <Footer />
    </>
  );
}
