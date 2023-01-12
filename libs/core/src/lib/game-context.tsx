import { createContext, useContext, useReducer } from 'react';
import { GameState, GameAction, GameProviderProps } from './game-context.type';

const GameContext = createContext<GameState | undefined>(undefined);

const GameDispatchContext = createContext<
  React.Dispatch<GameAction> | undefined
>(undefined);

const initialGameState: GameState = {
  gameStatus: 'start',
  selectedCategoryId: undefined,
  result: undefined,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'started': {
      return {
        ...state,
        gameStatus: 'play',
        result: undefined,
        selectedCategoryId: action.selectedCategoryId,
      };
    }

    case 'ended': {
      return { ...state, gameStatus: 'end', result: action.result };
    }

    case 'reset': {
      return {
        ...state,
        gameStatus: 'start',
        result: undefined,
        selectedCategoryId: undefined,
      };
    }

    default: {
      return state;
    }
  }
}

export function GameProvider({ children }: GameProviderProps) {
  const [game, dispatch] = useReducer(gameReducer, initialGameState);

  return (
    <GameContext.Provider value={game}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error(
      'useContext: `context` is undefined. Seems you forgot to wrap component within the GameProvider'
    );
  }

  return context;
}

export function useGameDispatch() {
  const dispatch = useContext(GameDispatchContext);

  if (!dispatch) {
    throw new Error(
      'useContext: `dispatch` is undefined. Seems you forgot to wrap component within the GameProvider'
    );
  }

  return dispatch;
}
