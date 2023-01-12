import { useMemo } from 'react';
import { createShuffledDeck } from '../utils/deck.util';
import { useEmojis } from './use-emojis';

export function useDeck() {
  const { emojis, isEmojisQueryLoading } = useEmojis();

  const deck = useMemo(
    () => (emojis ? createShuffledDeck(emojis) : []),
    [emojis]
  );

  const isInProgress = isEmojisQueryLoading;

  return { deck, isInProgress };
}
