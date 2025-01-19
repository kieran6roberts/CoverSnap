/* eslint-disable quotes */
import { Flex, Anchor, Box, Image } from '@mantine/core';
import { type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/cloudflare';

import { Link, MetaFunction } from '@remix-run/react';

import { WelcomeModal } from '~/components/WelcomeModal';
import { GitHubStarButton } from '~/components/GitHubStarButton';
import { ColorSchemeToggle } from '~/components/ThemeToggle';
import { MobileGithubButton } from '~/components/MobileGithubButton';
import { EditorArea } from '~/components/Layout/EditorArea';
import { editorOpenStateCookie, editorSidebarStateCookie, welcomeCookie } from '~/routes/create/cookies';

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const editorCookie = (await editorOpenStateCookie.parse(cookieHeader)) || {};
  const _welcomeCookie = (await welcomeCookie.parse(cookieHeader)) || {};
  const editorSidebarCookie = (await editorSidebarStateCookie.parse(cookieHeader)) || {};

  return {
    openItems: editorCookie.openItems,
    hasVisited: _welcomeCookie.hasVisited,
    sidebarState: editorSidebarCookie.sidebarState
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const cookieHeader = request.headers.get('Cookie');

  if (formData.get('intent') === 'updateOpenItems') {
    const editorCookie = (await editorOpenStateCookie.parse(cookieHeader)) || {};
    editorCookie.openItems = formData.get('openItems');

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
  const title = 'CoverSnap - Create';
  const description =
    "Use CoverSnap's easy-to-use editing tools and presets to download free cover images for your blog without the design headache.";
  const image = '/editor-dark.png';
  const url = 'https://coversnap.pages.dev/create';
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
          <Anchor component={Link} to="/" aria-label="CoverSnap logo">
            <Image src="/favicon.ico" width={36} height={36} alt="CoverSnap logo" />
          </Anchor>
          <Flex gap="xs">
            <ColorSchemeToggle />
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
