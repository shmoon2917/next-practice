import React from 'react';
import { GetStaticProps } from 'next';
import EventList from '../components/events/event-list';
import { Event, getFeaturedEvents } from '../helpers/api-utils';

interface Props {
  events: Event[];
}

const HomePage: React.FC<Props> = ({ events }) => {
  return (
    <div>
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
