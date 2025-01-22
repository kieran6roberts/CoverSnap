import { Flex, Box, Image } from '@mantine/core';
import { Link, MetaFunction } from 'react-router';

import { WelcomeModal } from '~/features/preview/components/WelcomeModal';
import { GitHubStarButton } from '~/shared/components/GitHubStarButton';
import { ThemeToggle } from '~/shared/components/ThemeToggle';
import { MobileGithubButton } from '~/shared/components/MobileGitHubButton';
import { EditorArea } from '~/shared/layouts/EditorArea';
import { DOMAIN, SITE_NAME } from '~/config/consts';

export const meta: MetaFunction = () => {
  const title = `${SITE_NAME} - Create`;
  const description = `Use ${SITE_NAME}'s easy-to-use editing tools and presets to download free cover images for your blog without the design headache.`;
  const image = '/editor-dark.webp';
  const url = `https://${DOMAIN}/create`;
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

export default function Create() {
  return (
    <>
      <WelcomeModal />

      <Box
        component="header"
        w="100%"
        py="md"
        px="lg"
        style={{ borderBottom: '1px solid var(--mantine-color-default-border)' }}
      >
        <Flex component="nav" justify="space-between" align="center">
          <Link
            to="/"
            style={{ fontSize: '1.5rem', fontWeight: 500, textDecoration: 'none' }}
            aria-label={`${SITE_NAME} logo`}
            viewTransition
          >
            <Image src="/favicon.ico" width={36} height={36} alt={`${SITE_NAME} logo`} />
          </Link>

          <Flex gap="xs">
            <ThemeToggle />
            <GitHubStarButton visibleFrom="md" size="sm" variant="light" />
            <MobileGithubButton />
          </Flex>
        </Flex>
      </Box>
      <Box
        component="main"
        style={{
          height: 'calc(100vh - 69px)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <EditorArea />
      </Box>
    </>
  );
}
