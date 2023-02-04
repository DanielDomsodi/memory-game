import { ChakraProvider } from '@chakra-ui/react';
import { GameProvider } from '@memory-game/game';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

const queryClient = new QueryClient();

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to web!</title>
      </Head>
      <main className="app">
        <ChakraProvider>
          <QueryClientProvider client={queryClient}>
            <GameProvider>
              <Component {...pageProps} />
            </GameProvider>
          </QueryClientProvider>
        </ChakraProvider>
      </main>
    </>
  );
}

export default CustomApp;
