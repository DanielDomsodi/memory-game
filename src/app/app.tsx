import { Box, Container } from '@chakra-ui/react';
import { GameBoard, GameResult, StartGame, useGame } from '@memory-game/core';

export function App() {
  const { gameStatus } = useGame();

  return (
    <Container maxW="container.lg" centerContent>
      <Box p={[null, 6]}>
        {gameStatus === 'start' && <StartGame />}
        {gameStatus === 'play' && <GameBoard />}
        {gameStatus === 'end' && <GameResult />}
      </Box>
    </Container>
  );
}

export default App;
