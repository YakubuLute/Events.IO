import React from 'react';
import { Notification, NotificationProps } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconX, IconCheck, IconInfoCircle, IconAlertTriangle } from '@tabler/icons-react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface ShowNotificationProps {
  type: NotificationType;
  title?: string;
  message: string;
  autoClose?: number | boolean;
}

const getIconAndColor = (type: NotificationType): { icon: React.ReactNode; color: string } => {
  switch (type) {
    case 'success':
      return { icon: <IconCheck size={20} />, color: 'teal' };
    case 'error':
      return { icon: <IconX size={20} />, color: 'red' };
    case 'info':
      return { icon: <IconInfoCircle size={20} />, color: 'blue' };
    case 'warning':
      return { icon: <IconAlertTriangle size={20} />, color: 'yellow' };
  }
};

export const showNotification = ({ type, title, message, autoClose = 5000 }: ShowNotificationProps) => {
  const { icon, color } = getIconAndColor(type);
  
  notifications.show({
    title: title || getDefaultTitle(type),
    message,
    icon,
    color,
    autoClose,
  });
};

const getDefaultTitle = (type: NotificationType): string => {
  switch (type) {
    case 'success':
      return 'Success!';
    case 'error':
      return 'Error!';
    case 'info':
      return 'Information';
    case 'warning':
      return 'Warning';
  }
};

interface MantineNotificationProps extends Omit<NotificationProps, 'title'> {
  type: NotificationType;
  title?: string;
  message: string;
}

export const MantineNotification: React.FC<MantineNotificationProps> = ({
  type,
  title,
  message,
  ...props
}) => {
  const { icon, color } = getIconAndColor(type);

  return (
    <Notification
      icon={icon}
      color={color}
      title={title || getDefaultTitle(type)}
      {...props}
    >
      {message}
    </Notification>
  );
};
