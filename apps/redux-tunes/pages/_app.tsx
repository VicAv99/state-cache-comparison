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
      <main className="app">
        <ReduxProvider store={store}>
          <Component {...pageProps} />
        </ReduxProvider>
      </main>
    </>
  );
}

export default CustomApp;
