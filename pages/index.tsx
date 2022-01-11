import React from 'react';
import fs from 'fs/promises';
import path from 'path';

import Link from 'next/link';
import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';
import { GetStaticProps } from 'next';

const HomePage: React.FC = ({}) => {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};
