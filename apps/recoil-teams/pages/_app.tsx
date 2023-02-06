import './styles.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to recoil-teams!</title>
      </Head>
      <main className="app">
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </main>
    </>
  );
}

export default CustomApp;
