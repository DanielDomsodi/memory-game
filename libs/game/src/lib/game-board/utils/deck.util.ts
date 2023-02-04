import { Emoji } from '@memory-game/api';
import { Card } from '../game-board.type';

// Source: https://bost.ocks.org/mike/shuffle/

export function shuffle(array: Card[]) {
  let m = array.length;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    const i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    const t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

export function createShuffledDeck(emojis: Emoji[]) {
  const deck = [...emojis].reduce<Card[]>((deck, { id, emoji, name }) => {
    const originalId = id.toString();
    const duplicateId = `duplicate-id-${originalId}`;
    const cardPairs: [Card, Card] = [
      { id: originalId, figure: emoji, matchId: duplicateId, name },
      { id: duplicateId, figure: emoji, matchId: originalId, name },
    ];

    return deck.concat(...cardPairs);
  }, []);

  const shuffledDeck = shuffle(deck);

  return shuffledDeck;
}
