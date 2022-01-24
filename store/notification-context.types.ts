export interface Notification {
  title: string;
  message: string;
  status: 'pending' | 'success' | 'error';
}

export interface NotificationContextType {
  notification: Notification | null;
  showNotification: (notificationData: Notification) => void;
  hideNotification: () => void;
}
