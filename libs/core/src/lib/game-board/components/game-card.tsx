import { Box, Center } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Card } from '../game-board.type';

export type CardProps = {
  onCardClick: (id: string, matchId: string) => void;
  isSelected: boolean;
} & Card;

export function GameCard(props: CardProps) {
  const { id, matchId, figure, name, isSelected, onCardClick } = props;
  return (
    <Box
      as={motion.div}
      cursor="pointer"
      w={['74px', '96px']}
      h={['74px', '96px']}
      position="relative"
      boxShadow="base"
      borderRadius="md"
      whileHover={{ scale: 1.1 }}
      _hover={{ boxShadow: 'lg' }}
      onClick={() => onCardClick(id, matchId)}
    >
      <Center
        as={motion.div}
        w="100%"
        h="100%"
        fontSize="4xl"
        position="absolute"
        borderColor="gray.100"
        borderWidth="1px"
        borderRadius="md"
        initial={false}
        transition="transform .1s ease-out"
        animate={{
          backfaceVisibility: 'hidden',
          rotateY: isSelected ? 0 : 180,
        }}
      >
        <span role="img" aria-label={name}>
          {figure}
        </span>
      </Center>
      <Box
        as={motion.div}
        position="absolute"
        w="100%"
        h="100%"
        display="flex"
        bgColor="gray.100"
        borderColor="gray.100"
        borderWidth="1px"
        borderRadius="md"
        alignItems="center"
        bgGradient="linear(to-t, cyan.400, cyan.300)"
        _hover={{
          bgGradient: 'linear(to-t, purple.500, pink.400)',
        }}
        transition="transform .1s ease-out"
        animate={{
          backfaceVisibility: 'hidden',
          rotateY: isSelected ? 180 : 0,
        }}
        initial={false}
        justifyContent="center"
      ></Box>
    </Box>
  );
}
