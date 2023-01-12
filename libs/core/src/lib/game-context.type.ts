export type GameResultStat = {
  moves: number;
};

export type GameStatus = 'start' | 'play' | 'end';

export type GameState = {
  gameStatus: GameStatus;
  selectedCategoryId: number | undefined;
  result: GameResultStat | undefined;
};

export type GameProviderProps = {
  children: React.ReactElement;
};

export type GameAction =
  | {
      type: 'started';
      selectedCategoryId: number;
    }
  | {
      type: 'ended';
      result: GameResultStat;
    }
  | { type: 'reset' };
