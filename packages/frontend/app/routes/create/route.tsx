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
  const image = '/og-image.png';
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
