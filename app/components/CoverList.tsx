import { Flex, Box } from '@mantine/core';
import classes from './CoverList.module.css';

export function CoverList() {
  return (
    <Flex gap="md" p="xl" className={classes.coverList} justify="flex-start" align="center">
      <Box bg="gray.1" />
      <Box bg="gray.1" />
      <Box bg="gray.1" />
      <Box bg="gray.1" />
    </Flex>
  );
}
