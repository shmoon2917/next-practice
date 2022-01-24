import { useContext } from 'react';
import NotificationContext from '../../../store/notification-context';
import { Notification as NotificationType } from '../../../store/notification-context.types';

import classes from './notification.module.css';

type Props = NotificationType;

const Notification: React.FC<Props> = ({ title, message, status }) => {
  const notificationCtx = useContext(NotificationContext);
  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  if (status === 'pending') {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
