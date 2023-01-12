import { CheckCircleIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';

export type PairsStat = {
  allPairs: number;
  foundedPairs: number;
};

export function PairsStat(props: PairsStat) {
  const { allPairs, foundedPairs } = props;

  return (
    <Text fontSize="lg" fontWeight="medium">
      <CheckCircleIcon mr="2" color="cyan.400" /> Founded pairs:{' '}
      {`${foundedPairs} of ${allPairs}`}
    </Text>
  );
}
