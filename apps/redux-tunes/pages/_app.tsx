import './styles.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '../store/store';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to redux-tunes!</title>
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex-grow h-full">
          <div className="relative bg-white shadow-md">
            <div className="container w-full px-4 py-2">
              <h3 className="p-0 m-0 font-mono">Redux Tunes</h3>
            </div>
          </div>
          <main className="container w-full h-full py-8">
            <ReduxProvider store={store}>
              <Component {...pageProps} />
            </ReduxProvider>
          </main>
        </div>
      </div>
    </>
  );
}

export default CustomApp;
