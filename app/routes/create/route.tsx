import { Flex, Anchor, Box, Image } from '@mantine/core';
import { type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/cloudflare';
import { Link, MetaFunction } from '@remix-run/react';

import { WelcomeModal } from '~/features/preview/components/WelcomeModal';
import { GitHubStarButton } from '~/shared/components/GitHubStarButton';
import { ThemeToggle } from '~/shared/components/ThemeToggle';
import { MobileGithubButton } from '~/shared/components/MobileGitHubButton';
import { EditorArea } from '~/shared/layouts/EditorArea';
import { editorOpenStateCookie, editorSidebarStateCookie, welcomeCookie } from '~/routes/create/cookies';
import { DOMAIN, SITE_NAME } from '~/config/consts';

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const editorCookie = (await editorOpenStateCookie.parse(cookieHeader)) || {};
  const _welcomeCookie = (await welcomeCookie.parse(cookieHeader)) || {};
  const editorSidebarCookie = (await editorSidebarStateCookie.parse(cookieHeader)) || {};

  const openItems = editorCookie.openItems ? editorCookie.openItems.split(',') : [];

  return {
    openItems,
    hasVisited: _welcomeCookie.hasVisited,
    sidebarState: editorSidebarCookie.sidebarState
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const cookieHeader = request.headers.get('Cookie');

  if (formData.get('intent') === 'updateOpenItems') {
    const editorCookie = (await editorOpenStateCookie.parse(cookieHeader)) || {};
    const newItems = formData.get('openItems')?.toString().split(',') || [];
    const uniqueItems = [...new Set(newItems)].filter((item) => !!item);
    editorCookie.openItems = uniqueItems.join(',');

    return new Response('', {
      headers: {
        'Set-Cookie': await editorOpenStateCookie.serialize(editorCookie)
      }
    });
  }

  if (formData.get('intent') === 'updateHasVisited') {
    const _welcomeCookie = (await welcomeCookie.parse(cookieHeader)) || {};
    _welcomeCookie.hasVisited = 'true';

    return new Response('', {
      headers: {
        'Set-Cookie': await welcomeCookie.serialize(_welcomeCookie)
      }
    });
  }

  if (formData.get('intent') === 'updateSidebarState') {
    const editorSidebarCookie = (await editorSidebarStateCookie.parse(cookieHeader)) || {};
    editorSidebarCookie.sidebarState = formData.get('sidebarState');

    return new Response('', {
      headers: {
        'Set-Cookie': await editorSidebarStateCookie.serialize(editorSidebarCookie)
      }
    });
  }
}

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
          <Anchor component={Link} to="/" aria-label={`${SITE_NAME} logo`}>
            <Image src="/favicon.ico" width={36} height={36} alt={`${SITE_NAME} logo`} />
          </Anchor>
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
