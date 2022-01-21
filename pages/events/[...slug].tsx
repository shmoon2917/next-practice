import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { Fragment, useEffect, useState } from 'react';
import useSWR from 'swr';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button/button';
import ErrorAlert from '../../components/ui/error-alert/error-alert';
import { Event, getFilteredEvents } from '../../helpers/api-utils';

interface Props {
  filteredEvents?: Event[];
  date?: { year: number; month: number };
  hasError?: boolean;
}
interface ContextParams extends ParsedUrlQuery {
  slug: string[];
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

const FilteredEventsPage: React.FC<Props> = (
  {
    // filteredEvents,
    // hasError,
    // date,
  }
) => {
  const router = useRouter();
  const [loadedEvents, setLoadedEvents] = useState<Event[]>();

  const filterData = router.query.slug;
  const { data, error } = useSWR(
    'https://next-js-bf3c8-default-rtdb.asia-southeast1.firebasedatabase.app/events.json',
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events: Event[] = [];

      for (let key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name='description' content={`A list of filtered events`} />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <p className='center'>Loading...</p>
      </Fragment>
    );
  }

  const [year, month] = filterData as string[];
  const numYear = +year;
  const numMonth = +month;

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name='description'
        content={`All events for ${numMonth}/${numYear}.`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values</p>
        </ErrorAlert>

        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || !filteredEvents?.length) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>

        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const targetDate = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={targetDate} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

// export const getServerSideProps: GetServerSideProps<
//   Props,
//   ContextParams
// > = async (context) => {
//   const { params } = context;

//   const [year, month] = params?.slug as string[];
//   const numYear = +year;
//   const numMonth = +month;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// };

export default FilteredEventsPage;
