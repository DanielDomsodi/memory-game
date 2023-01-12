import { getRandomEmojisByCategory } from '@memory-game/api';
import { useQuery } from '@tanstack/react-query';
import { useGame } from '../../game-context';

export function useEmojis() {
  const { selectedCategoryId, gameStatus } = useGame();

  const shouldFetchEmojis = gameStatus === 'play' && !!selectedCategoryId;
  const { data: emojis, isLoading: isEmojisQueryLoading } = useQuery({
    queryKey: ['emojis', selectedCategoryId],
    queryFn: async () => {
      if (!selectedCategoryId) {
        return;
      }

      const data = await getRandomEmojisByCategory(selectedCategoryId);
      return data.results;
    },
    refetchOnWindowFocus: false,
    enabled: shouldFetchEmojis,
  });

  return {
    emojis,
    isEmojisQueryLoading,
  };
}
