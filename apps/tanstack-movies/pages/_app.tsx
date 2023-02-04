import './styles.css';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { trpc } from '../utils/trpc';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to tanstack-movies!</title>
      </Head>
      <div className="bg-gray-50">
        <div className="relative bg-white shadow-md">
          <div className="container w-full px-4 py-2">
            <h3 className="p-0 m-0 font-mono">TanStack Movies</h3>
          </div>
        </div>
        <main className="h-[calc(100vh-55px)] w-full container py-8">
          <Component {...pageProps} />
        </main>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
}

export default trpc.withTRPC(CustomApp);
