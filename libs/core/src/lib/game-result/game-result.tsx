import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useGame, useGameDispatch } from '../game-context';

const container = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0 },
};

export function GameResult() {
  const { result } = useGame();
  const dispatch = useGameDispatch();

  return (
    <Stack
      as={motion.div}
      variants={container}
      initial="hidden"
      animate="show"
      align="center"
      spacing="6"
    >
      <Heading
        as={motion.h2}
        variants={item}
        fontSize="6xl"
        fontWeight="black"
        bgGradient="linear(to-r, cyan.300, pink.400)"
        bgClip="text"
      >
        Awesome
      </Heading>
      <Box as={motion.div} variants={item} fontSize="8xl">
        <span role="img" aria-label="congrat emoji">
          🎉
        </span>
      </Box>
      <Text fontSize="2xl" align="center">
        You solved it in
        <br />{' '}
        <Text
          as="span"
          fontSize="7xl"
          fontWeight="black"
          bgGradient="linear(to-r, purple.500, pink.400)"
          bgClip="text"
        >
          {result?.moves}
        </Text>{' '}
        <br />
        moves.
      </Text>
      <Button
        colorScheme="cyan"
        size="lg"
        onClick={() => dispatch({ type: 'reset' })}
      >
        New game
      </Button>
    </Stack>
  );
}
