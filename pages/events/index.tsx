import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Fragment, useRef } from 'react';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { Event, getAllEvents } from '../../helpers/api-utils';

interface Props {
  events: Event[];
}

const AllEventsPage: React.FC<Props> = ({ events }) => {
  const router = useRouter();

  const findEventsHandler = (year?: string, month?: string) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export default AllEventsPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allEvents = await getAllEvents();

  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
};
