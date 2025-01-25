import { Box } from '@mantine/core';
import { MetaFunction } from 'react-router';

import { WelcomeModal } from '~/features/preview/components/WelcomeModal';
import { EditorArea } from '~/shared/layouts/EditorArea';
import { DOMAIN, SITE_NAME } from '~/config/consts';
import { useEditorUIStore } from '~/shared/stores/EditorUIStore';
import { Navbar } from '~/shared/layouts/Navbar';

export const meta: MetaFunction = () => {
  const title = `${SITE_NAME} - Create`;
  const description = `Use ${SITE_NAME}'s easy-to-use editing tools and presets to download free cover images for your blog without the design headache.`;
  const url = `https://${DOMAIN}/create`;
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

export default function Create() {
  const { hasSeenWelcome, isHydrated, setHasSeenWelcome } = useEditorUIStore();
  return (
    <>
      <WelcomeModal isOpen={!hasSeenWelcome && isHydrated} hideWelcome={() => setHasSeenWelcome(true)} />

      <Navbar />
      <Box component="main" h="calc(100vh - 69px)">
        <EditorArea />
      </Box>
    </>
  );
}
