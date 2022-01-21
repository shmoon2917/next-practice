import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/layout';
import { Fragment } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        {/* overwritten by latest */}
        <title>Next Events</title>
        <meta name='description' content='NextJS events' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
