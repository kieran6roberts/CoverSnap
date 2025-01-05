import { Flex, Anchor, Box, Image } from '@mantine/core';
import { type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/cloudflare';

import { Link, MetaFunction } from '@remix-run/react';

import { WelcomeModal } from '~/components/WelcomeModal';
import { GitHubStarButton } from '~/components/GitHubStarButton';
import { ColorSchemeToggle } from '~/components/ThemeToggle';
import { MobileGithubButton } from '~/components/MobileGithubButton';
import { EditorArea } from '~/components/Layout/EditorArea';
import { editorOpenStateCookie, welcomeCookie } from '~/routes/create/cookies';

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const editorCookie = (await editorOpenStateCookie.parse(cookieHeader)) || {};
  const _welcomeCookie = (await welcomeCookie.parse(cookieHeader)) || {};

  return { openItems: editorCookie.openItems, hasVisited: _welcomeCookie.hasVisited };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const cookieHeader = request.headers.get('Cookie');

  if (formData.get('openItems')) {
    const editorCookie = (await editorOpenStateCookie.parse(cookieHeader)) || {};
    editorCookie.openItems = formData.get('openItems');

    return new Response('', {
      headers: {
        'Set-Cookie': await editorOpenStateCookie.serialize(editorCookie)
      }
    });
  }

  if (formData.get('hasVisited')) {
    const _welcomeCookie = (await welcomeCookie.parse(cookieHeader)) || {};
    _welcomeCookie.hasVisited = 'true';

    return new Response('', {
      headers: {
        'Set-Cookie': await welcomeCookie.serialize(_welcomeCookie)
      }
    });
  }
}

export const meta: MetaFunction = () => {
  return [
    { title: 'CoverSnap | Easily Create Blog Cover Images' },
    {
      name: 'description',
      content:
        'Use the clean and easy-to-use editing tools to build your cover image. Download it when you are ready. Jump in!'
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
      <main>
        <EditorArea />
      </main>
    </>
  );
}
