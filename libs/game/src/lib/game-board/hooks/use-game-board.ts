import { useEffect, useState } from 'react';
import { useGameDispatch } from '../../game-context';
import { CardProps } from '../components/game-card';
import { DEFAULT_BACK_FLIP_DELAY } from '../game-board.constant';
import { Card } from '../game-board.type';
import { useDeck } from './use-deck';

export function useGameBoard() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [foundedIds, setFoundedIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);

  const { deck, isInProgress: isDeckCreationInProgress } = useDeck();

  const dispatch = useGameDispatch();

  const foundedPairs = foundedIds.length / 2;

  const allPairFounded = deck.length !== 0 && deck.length === foundedIds.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (selectedIds.length >= 2) {
        setSelectedIds([]);
        setMoves((m) => m + 1);
      }
    }, DEFAULT_BACK_FLIP_DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, [selectedIds]);

  useEffect(() => {
    if (!allPairFounded) {
      return;
    }

    dispatch({ type: 'ended', result: { moves } });
  }, [dispatch, moves, allPairFounded]);

  function getGameCardProps(card: Card): CardProps {
    const isSelected =
      selectedIds.includes(card.id) || foundedIds.includes(card.id);

    function handleCardClick(id: string, matchId: string) {
      const selections =
        selectedIds.length === 0
          ? [id]
          : selectedIds.includes(id)
          ? selectedIds
          : [...selectedIds, id];

      if (selections.length > 2) {
        return;
      }

      if (selections.length === 2 && selections.includes(matchId)) {
        setTimeout(() => {
          setFoundedIds((ids) => [...ids, matchId, id]);
        }, DEFAULT_BACK_FLIP_DELAY);
      }

      setSelectedIds(selections);
    }

    return {
      ...card,
      isSelected,
      onCardClick: handleCardClick,
    };
  }

  function checkCardFounded(cardId: string) {
    return foundedIds.includes(cardId);
  }

  function startNewGame() {
    dispatch({ type: 'reset' });
  }

  return {
    deck,
    isDeckCreationInProgress,
    allPairFounded,
    foundedPairs,
    moves,
    startNewGame,
    getGameCardProps,
    checkCardFounded,
  };
}
