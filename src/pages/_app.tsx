import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import '../styles/globals.css';

const ContentContext = createContext<any>([]);
export const useContentContext = () => useContext(ContentContext);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Standup App</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
        <Component pageProps={pageProps} />
      </SessionProvider>
    </>
  );
}
