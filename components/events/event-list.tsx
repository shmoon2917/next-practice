import React from 'react';
import { Event } from '../../dummy-data';
import EventItem from './event-item';

import classes from './event-list.module.css';

interface Props {
  items: Event[];
}

const EventList: React.FC<Props> = ({ items }) => {
  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <EventItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default EventList;
