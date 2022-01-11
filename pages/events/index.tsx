import { useRouter } from 'next/router';
import { Fragment, useRef } from 'react';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { getAllEvents } from '../../dummy-data';

const AllEventsPage: React.FC = () => {
  const events = getAllEvents();
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