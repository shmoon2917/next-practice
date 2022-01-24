import React, { Fragment, useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import Notification from '../ui/notification/notification';
import MainHeader from './main-header';

const Layout: React.FC = ({ children }) => {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && <Notification {...activeNotification} />}
    </Fragment>
  );
};

export default Layout;
