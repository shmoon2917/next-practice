import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Event } from '../../dummy-data';
import Button from '../ui/button/button';
import AddressIcon from '../ui/icons/address-icon';
import ArrowRightIcon from '../ui/icons/arrow-right-icon';
import DateIcon from '../ui/icons/date-icon';

import classes from './event-item.module.css';

interface Props {
  item: Event;
}

const EventItem: React.FC<Props> = ({ item }) => {
  const { title, image, date, location, id } = item;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = location.replace(', ', '\n');
  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <Image src={`/${image}`} alt={title} width={250} height={160} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>explore event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
