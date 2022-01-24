import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/layout';
import { Fragment } from 'react';
import Head from 'next/head';
import Notification from '../components/ui/notification/notification';
import { NotificationContextProvider } from '../store/notification-context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          {/* overwritten by latest */}
          <title>Next Events</title>
          <meta name='description' content='NextJS events' />
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
