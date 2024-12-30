import type { MetaFunction } from '@remix-run/node';
import { ColorSchemeToggle } from '~/components/ThemeToggle';
import { Container, Title, Text, Flex, Anchor, Stack, Button, Box } from '@mantine/core';
import { StarSolid } from 'iconoir-react';
import { Link } from '@remix-run/react';
import { BrandLogo } from '~/components/BrandLogo';

export const meta: MetaFunction = () => {
  return [
    { title: 'CoverSnap' },
    {
      name: 'description',
      content: 'CoverSnap lets you easily generate good looking cover images for your blog posts.'
    }
  ];
};

const GITHUB_URL = 'https://github.com/kieran6roberts/CoverSnap';
const PORTFOLIO_URL = 'https://kieranroberts.dev';

export default function Index() {
  return (
    <Stack h="100vh" justify="space-between">
      <Box component="header" w="100%" py="md" bg="blue" h={75}>
        <Container size="md">
          <Flex component="nav" justify="space-between" align="center">
            <Anchor size="sm" w={150} fw={500} variant="text" c="white" component={Link} to="/">
              <BrandLogo />
            </Anchor>
            <ColorSchemeToggle />
          </Flex>
        </Container>
      </Box>
      <Container>
        <main>
          <Stack justify="center" gap="xs" align="center" mt="lg">
            <Title ta="center" fz="1.5rem" fw={500}>
              Welcome to{' '}
              <Text inherit component="div" fw={700} w={300}>
                <BrandLogo />
              </Text>
            </Title>
            <Text ta="center" c="dimmed" size="sm">
              Built by{' '}
              <Anchor href={PORTFOLIO_URL} underline="always" target="_blank">
                Kieran Roberts
              </Anchor>
            </Text>
            <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
              CoverSnap lets you generate good looking cover images for your blog posts in seconds. It's completely free
              to use and if you like it, give it a star on GitHub. Enjoy!
            </Text>
            <Flex justify="center" align="center" gap="md" mt="xl">
              <Button component={Link} to="/create" size="md" variant="filled">
                Build for free
              </Button>
              <Button component={Link} target="_blank" to={GITHUB_URL} size="md" variant="outline">
                <Flex align="center" gap="xs">
                  <StarSolid width={20} /> on GitHub
                </Flex>
              </Button>
            </Flex>
          </Stack>
        </main>
      </Container>
      <Box component="footer" w="100%" py="lg">
        <Container size="xl">
          <Stack gap="xs" justify="center" align="center">
            <Text ta="center" size="sm">
              CoverSnap on{' '}
              <Anchor href={GITHUB_URL} underline="always" target="_blank">
                GitHub
              </Anchor>
            </Text>
          </Stack>
        </Container>
      </Box>
    </Stack>
  );
}
