import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { trpc } from '../utils/trpc';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to tanstack-movies!</title>
      </Head>
      <div className="bg-gray-50">
        <div className="shadow-md relative bg-white">
          <div className="w-full px-4 py-2 bg-white container">
            <h3 className="m-0 p-0 font-mono">TanStack Movies</h3>
          </div>
        </div>
        <main className="h-[calc(100vh-55px)] w-full container py-8">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default trpc.withTRPC(CustomApp);
