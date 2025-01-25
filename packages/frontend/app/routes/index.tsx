import type { MetaFunction } from 'react-router';
import { Container, Title, Text, Flex, Stack, Button, Box, Image, Mark } from '@mantine/core';
import { Link } from 'react-router';

import { Footer } from '~/shared/layouts/Footer';
import { GitHubStarButton } from '~/shared/components/GitHubStarButton';
import editorLight from '~/images/editor-light.webp';
import editorDark from '~/images/editor-dark.webp';
import { DOMAIN, SITE_NAME } from '~/config/consts';
import { Navbar } from '~/shared/layouts/Navbar';

export const meta: MetaFunction = () => {
  const title = `${SITE_NAME} - Get your free blog post cover images.`;
  const description = `Every blog post needs to good cover article. ${SITE_NAME} empowers you to create great looking blog cover images in seconds using templates and simple editing tools. It's completely free to download as many cover images as you like.`;
  const url = `https://${DOMAIN}`;
  const domain = DOMAIN;

  return [
    { title, description },
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
      content: '/og-image.png'
    },
    {
      property: 'og:image:alt',
      content: 'CvrSnap - Create blog post cover images in seconds'
    },
    {
      property: 'og:image:width',
      content: '1200'
    },
    {
      property: 'og:image:height',
      content: '630'
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
      content: 'CvrSnap'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:creator',
      content: '@Kieran6Dev'
    },
    {
      property: 'twitter:site',
      content: '@Kieran6dev'
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
      <Navbar />
      <Container component="main" size="xl">
        <Flex direction="column" gap="xl" align="center" mt={{ base: 80, sm: 100 }}>
          <Stack justify="center" gap="xs">
            <Title
              ta="center"
              order={1}
              fz={{ base: '2.4rem', sm: '4.5rem' }}
              style={{ lineHeight: '1', zIndex: 1 }}
              fw={700}
              aria-label={SITE_NAME}
              maw={{ base: 500, sm: 800 }}
              mx="auto"
            >
              Publish blog posts{' '}
              <Mark fz="0.95em" style={{ zIndex: -1 }} color="yellow">
                faster
              </Mark>{' '}
              and take away the cover image design burden
            </Title>

            <Text fz={{ base: 'md', sm: 'lg' }} ta="center" maw={580} mx="auto" mt="md">
              Most blog posts need a good cover article. {SITE_NAME} empowers you to create great looking blog cover
              images in seconds using templates and simple editing tools. It's completely free to download as many cover
              images as you like.
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
              boxShadow: 'var(--mantine-shadow-sm)'
            }}
            h="100%"
            w="100%"
            mah="700px"
            maw="1200px"
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
