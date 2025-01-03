import { Flex, Anchor, Box, Image } from '@mantine/core';
import { type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/node';
import { Link, MetaFunction } from '@remix-run/react';

import { WelcomeModal } from '~/components/WelcomeModal';
import { GitHubStarButton } from '~/components/GitHubStarButton';
import { ColorSchemeToggle } from '~/components/ThemeToggle';
import { MobileGithubButton } from '~/components/MobileGithubButton';
import { EditorArea } from '~/components/Layout/EditorArea';
import { editorOpenStateCookie } from '~/cookies.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await editorOpenStateCookie.parse(cookieHeader)) || {};
  return { openItems: cookie.openItems };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await editorOpenStateCookie.parse(cookieHeader)) || {};

  cookie.openItems = cookie.openItems = formData.get('openItems');

  return new Response('', {
    headers: {
      'Set-Cookie': await editorOpenStateCookie.serialize(cookie)
    }
  });
}

export const meta: MetaFunction = () => {
  return [
    { title: 'CoverSnap | Create Blog Cover Images' },
    {
      name: 'description',
      content: 'Use the editing tools to build your cover image and download it when you are ready.'
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
          <Anchor component={Link} to="/" display="flex" aria-label="CoverSnap logo">
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
