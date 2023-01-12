import { ChakraProvider } from '@chakra-ui/react';
import { GameProvider } from '@memory-game/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <GameProvider>
          <App />
        </GameProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>
);
