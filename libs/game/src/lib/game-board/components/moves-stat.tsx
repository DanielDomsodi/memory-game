import { StarIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';

export type MovesStatProps = {
  moves: number;
};

export function MovesStat(props: MovesStatProps) {
  const { moves } = props;

  return (
    <Text fontSize="lg" fontWeight="medium">
      <StarIcon mr="2" color="cyan.400" /> Moves: {moves}
    </Text>
  );
}
