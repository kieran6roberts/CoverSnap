import type { MetaFunction } from 'react-router';
import { Container, Title, Text, Flex, Stack, Button, Box, Image, Mark, List, ThemeIcon } from '@mantine/core';
import { Link } from 'react-router';
import { CheckCircleSolid } from 'iconoir-react';

import { Footer } from '~/shared/layouts/Footer';
import { GitHubStarButton } from '~/shared/components/GitHubStarButton';
import editorLight from '~/images/editor-light.webp';
import editorDark from '~/images/editor-dark.webp';
import { DOMAIN, SITE_NAME } from '~/config/consts';
import { Navbar } from '~/shared/layouts/Navbar';
import classes from '~/shared/styles/index.module.css';

export const meta: MetaFunction = () => {
  const title = `${SITE_NAME} - Get your free blog post cover images.`;
  const description = `Every blog post needs to good cover article. ${SITE_NAME} empowers you to create great looking blog cover images in seconds using templates and simple editing tools. It's completely free to download as many cover images as you like.`;
  const url = `https://${DOMAIN}`;

  return [
    { title, description },
    {
      property: 'og:url',
      content: url
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
      <Box className={classes['themed-bg']}>
        <Container component="main" size="xl">
          <Flex direction="column" gap="xl" align="center" pt={{ base: 80, sm: 100 }}>
            <Stack justify="center" gap="xs">
              <Title
                ta="center"
                order={1}
                fz={{ base: '2.2rem', sm: '4.5rem' }}
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

              <Text fz={{ base: 'sm', sm: 'lg' }} fw={500} ta="center" maw={660} mx="auto" mt="md">
                Most blog posts need a good cover article and {SITE_NAME} empowers you to create great looking blog
                cover images in seconds using templates and simple editing tools. It's completely free to download as
                many cover images as you like.
              </Text>
              <Flex direction={{ base: 'column', sm: 'row' }} justify="center" align="center" gap="md" mt="xl">
                <Button
                  hiddenFrom="sm"
                  component={Link}
                  to="/create"
                  size="lg"
                  variant="gradient"
                  gradient={{ from: 'grape', to: 'violet', deg: 135 }}
                  viewTransition
                >
                  Build for free
                </Button>
                <Button
                  visibleFrom="sm"
                  component={Link}
                  to="/create"
                  size="lg"
                  variant="gradient"
                  gradient={{ from: 'grape', to: 'violet', deg: 135 }}
                  viewTransition
                >
                  Build for free
                </Button>
                <GitHubStarButton hiddenFrom="sm" size="lg" variant="outline" />
                <GitHubStarButton visibleFrom="sm" size="lg" variant="outline" />
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
                // lightHidden
                src={heroImages['dark']}
                alt={`${SITE_NAME} create page screenshot`}
                radius="md"
                loading="eager"
              />
              {/* <Image
                darkHidden
                src={heroImages['light']}
                alt={`${SITE_NAME} create page screenshot`}
                radius="md"
                loading="eager"
              /> */}
            </Box>
            <Flex component="section" direction="column" gap="md" mb={40}>
              <Title order={2} fz={{ base: '1.5rem', sm: '2rem' }} ta="center">
                Whos is CvrSnap for?
              </Title>
              <List
                maw={650}
                mx="auto"
                spacing="md"
                center
                icon={
                  <ThemeIcon color="green" size={24} radius="xl">
                    <CheckCircleSolid width={16} height={16} color="white" />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <Text fz={{ base: 'sm', sm: 'lg' }}>
                    Someone who needs a simple good looking blog cover image with text as the highlight, usually for the
                    blog title and author.
                  </Text>
                </List.Item>
                <List.Item>
                  <Text fz={{ base: 'sm', sm: 'lg' }}>
                    You don't want a cover image from an internet image platform.
                  </Text>
                </List.Item>
                <List.Item>
                  <Text fz={{ base: 'sm', sm: 'lg' }}>
                    You don't want to spend hours starting from sratch. You just want to pick some preset templates,
                    maybe change some font settings etc.
                  </Text>
                </List.Item>
                <List.Item>
                  <Text fz={{ base: 'sm', sm: 'lg' }}>
                    You want to do all of this in a modern and user-friendly editor.
                  </Text>
                </List.Item>
              </List>
            </Flex>
          </Flex>
        </Container>
        <Footer />
      </Box>
    </>
  );
}
