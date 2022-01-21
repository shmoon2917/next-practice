import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { Fragment } from 'react';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import ErrorAlert from '../../components/ui/error-alert/error-alert';
import {
  Event,
  getAllEvents,
  getEventById,
  getFeaturedEvents,
} from '../../helpers/api-utils';

interface Props {
  selectedEvent: Event;
}
interface ContextParams extends ParsedUrlQuery {
  pid: string;
}

const EventDetailPage: React.FC<Props> = ({ selectedEvent }) => {
  if (!selectedEvent) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{selectedEvent.title}</title>
        <meta name='description' content={selectedEvent.description} />
      </Head>
      <EventSummary title={selectedEvent.title} />
      <EventLogistics
        date={selectedEvent.date}
        address={selectedEvent.location}
        image={selectedEvent.image}
        imageAlt={selectedEvent.title}
      />
      <EventContent>
        <p>{selectedEvent.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allEvents = await getFeaturedEvents();
  const paths = allEvents.map((event) => ({ params: { eventId: event.id } }));

  console.log(paths);

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, ContextParams> = async (
  context
) => {
  const eventId = context.params?.eventId as string;

  const event = await getEventById(eventId);
  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
};

export default EventDetailPage;
