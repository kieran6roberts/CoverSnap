import type { MetaFunction } from '@remix-run/cloudflare';
import { Container, Title, Text, Flex, Anchor, Stack, Button, Box, Image, Mark } from '@mantine/core';
import { Link } from '@remix-run/react';

import { ColorSchemeToggle } from '~/components/ThemeToggle';
import { Footer } from '~/components/Layout/Footer';
import { GitHubStarButton } from '~/components/GitHubStarButton';

export const meta: MetaFunction = () => {
  const title = 'CoverSnap - Build free blog post cover images in seconds.';
  const description =
    'CoverSnap lets you easily generate good looking cover images for your blog posts, without the design headache.';
  const image = '/home-dark.png';
  const url = 'https://coversnap.pages.dev';
  const domain = 'coversnap.pages.dev';

  return [
    { title },
    {
      name: 'description',
      content: description
    },
    {
      property: 'og:title',
      content: title
    },
    {
      property: 'og:description',
      content: description
    },
    {
      property: 'og:image',
      content: image
    },
    {
      property: 'og:url',
      content: url
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:site_name',
      content: domain
    },
    {
      property: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      property: 'twitter:creator',
      content: '@Kieran6Dev'
    },
    {
      property: 'twitter:title',
      content: title
    },
    {
      property: 'twitter:description',
      content: description
    },
    {
      property: 'twitter:image',
      content: image
    },
    {
      property: 'twitter:url',
      content: url
    },
    {
      property: 'twitter:domain',
      content: domain
    }
  ];
};

const heroImages = {
  light: '/editor-light.png',
  dark: '/editor-dark.png'
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
              CoverSnap empowers you to create great looking cover images for your blog posts in seconds using easy to
              use editing tools. No design skills required and it's completely free to download your image.
            </Text>
            <Flex direction={{ base: 'column', sm: 'row' }} justify="center" align="center" gap="md" mt="xl">
              <Button hiddenFrom="sm" component={Link} to="/create" size="lg" variant="filled">
                Build for free
              </Button>
              <Button visibleFrom="sm" component={Link} to="/create" size="lg" variant="filled">
                Build for free
              </Button>
              <GitHubStarButton hiddenFrom="sm" size="md" variant="outline" />
              <GitHubStarButton visibleFrom="sm" size="md" variant="outline" />
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
            <Image
              lightHidden
              src={heroImages['dark']}
              alt="CoverSnap create page screenshot"
              radius="md"
              loading="eager"
            />
            <Image
              darkHidden
              src={heroImages['light']}
              alt="CoverSnap create page screenshot"
              radius="md"
              loading="eager"
            />
          </Box>
        </Flex>
      </Container>
      <Footer />
    </>
  );
}
