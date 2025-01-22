import type { MetaFunction } from 'react-router';
import { Container, Title, Text, Flex, Anchor, Stack, Button, Box, Image, Mark } from '@mantine/core';
import { Link } from 'react-router';

import { ThemeToggle } from '~/shared/components/ThemeToggle';
import { Footer } from '~/shared/layouts/Footer';
import { GitHubStarButton } from '~/shared/components/GitHubStarButton';
import editorLight from '~/images/editor-light.webp';
import editorDark from '~/images/editor-dark.webp';
import { DOMAIN, SITE_NAME } from '~/config/consts';

export const meta: MetaFunction = () => {
  const title = `${SITE_NAME} - Get your free blog post cover images.`;
  const description = `${SITE_NAME} empowers you to create great looking cover images for your blog posts in seconds, skipping the design hassle. It's completely free to download as many images as you like.`;
  const image = editorDark;
  const url = `https://${DOMAIN}`;
  const domain = DOMAIN;

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
  light: editorLight,
  dark: editorDark
} as const;

export default function Index() {
  return (
    <>
      <Box component="header" w="100%" py="md">
        <Container size="lg">
          <Flex component="nav" justify="space-between" align="center">
            <Anchor size="sm" fz={{ base: '1.3rem', sm: '1.5rem' }} fw={500} variant="text" component={Link} to="/">
              {SITE_NAME}
            </Anchor>
            <ThemeToggle />
          </Flex>
        </Container>
      </Box>
      <Container component="main" size="xl">
        <Flex direction="column" gap="xl" align="center" mt={{ base: 80, sm: 100 }}>
          <Stack justify="center" gap="xs">
            <Title
              ta="center"
              fz={{ base: '2.4rem', sm: '4.5rem' }}
              style={{ lineHeight: '1', zIndex: 1 }}
              fw={700}
              aria-label={SITE_NAME}
              maw={{ base: 500, sm: 700 }}
              mx="auto"
            >
              Publish blog posts{' '}
              <Mark fz="0.95em" style={{ zIndex: -1 }}>
                faster
              </Mark>{' '}
              without cover image design hassle
            </Title>

            <Text c="dimmed" fz={{ base: 'md', sm: 'lg' }} ta="center" maw={580} mx="auto" mt="md">
              {SITE_NAME} empowers you to create great looking cover images for your blog posts in seconds using easy to
              use editing tools. No design skills required and it's completely free to download your image.
            </Text>
            <Flex direction={{ base: 'column', sm: 'row' }} justify="center" align="center" gap="md" mt="xl">
              <Button hiddenFrom="sm" component={Link} to="/create" size="lg" variant="filled" viewTransition>
                Build for free
              </Button>
              <Button visibleFrom="sm" component={Link} to="/create" size="lg" variant="filled" viewTransition>
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
              alt={`${SITE_NAME} create page screenshot`}
              radius="md"
              loading="eager"
            />
            <Image
              darkHidden
              src={heroImages['light']}
              alt={`${SITE_NAME} create page screenshot`}
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
