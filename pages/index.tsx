import React from 'react';
import { GetStaticProps } from 'next';
import EventList from '../components/events/event-list';
import { Event, getFeaturedEvents } from '../helpers/api-utils';
import Head from 'next/head';

interface Props {
  events: Event[];
}

const HomePage: React.FC<Props> = ({ events }) => {
  return (
    <div>
      <Head>
        <title>Next.js Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow to you evolve'
        />
      </Head>
      <EventList items={events} />
    </div>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
};
