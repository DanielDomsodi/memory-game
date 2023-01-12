import { Box, Button, Flex, SimpleGrid, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { GameCard } from './components/game-card';
import { MovesStat } from './components/moves-stat';
import { PairsStat } from './components/pairs-stat';
import { useGameBoard } from './hooks/use-game-board';

const container = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0 },
};

export function GameBoard() {
  const {
    deck,
    isDeckCreationInProgress,
    foundedPairs,
    moves,
    getGameCardProps,
    startNewGame,
    checkCardFounded,
  } = useGameBoard();

  return (
    <Stack>
      {!isDeckCreationInProgress && (
        <>
          <Flex justify="space-between" align="center" p="4">
            <Stack spacing="2">
              <PairsStat
                allPairs={deck.length / 2}
                foundedPairs={foundedPairs}
              />
              <MovesStat moves={moves} />
            </Stack>
            <Box>
              <Button colorScheme="cyan" onClick={() => startNewGame()}>
                New game
              </Button>
            </Box>
          </Flex>
          <SimpleGrid
            as={motion.div}
            variants={container}
            initial="hidden"
            animate="show"
            padding={4}
            borderWidth="1px"
            borderRadius="md"
            borderColor="gray.200"
            columns={5}
            spacing="3"
            gridAutoColumns="auto"
          >
            {deck.map((card) =>
              checkCardFounded(card.id) ? (
                <Box
                  key={card.id}
                  w="96px"
                  h="96px"
                  borderWidth="1px"
                  borderColor="gray.100"
                  borderRadius="md"
                />
              ) : (
                <Box key={card.id} as={motion.div} variants={item}>
                  <GameCard {...getGameCardProps(card)} />
                </Box>
              )
            )}
          </SimpleGrid>
        </>
      )}
    </Stack>
  );
}

export default GameBoard;
