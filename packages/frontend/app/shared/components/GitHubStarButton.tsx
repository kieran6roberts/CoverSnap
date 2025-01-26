import { Flex, Button, ButtonProps } from '@mantine/core';
import { Link } from 'react-router';
import { Github } from 'iconoir-react';

import { GITHUB_URL } from '~/config/consts';

export function GitHubStarButton({ ...props }: ButtonProps) {
  return (
    <Button component={Link} target="_blank" to={GITHUB_URL} {...props}>
      <Flex align="center" gap="xs">
        <Github width={20} /> GitHub
      </Flex>
    </Button>
  );
}
