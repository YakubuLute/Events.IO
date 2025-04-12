import React from 'react';
import { Notification, NotificationProps, rem, MantineTheme } from '@mantine/core';
import { notifications, NotificationProps as MantineNotificationProps } from '@mantine/notifications';
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

// Custom animation for notifications
const slideAnimation = {
  in: { opacity: 0, transform: 'translateY(-20px)' },
  out: { opacity: 0, transform: 'translateY(20px)' },
  transitionProperty: 'transform, opacity',
  common: { transformOrigin: 'top center' },
  transitionDuration: 500, // Slowing down the animation (in ms)
  transitionTimingFunction: 'ease',
};

export const showNotification = ({ type, title, message, autoClose = 5000 }: ShowNotificationProps) => {
  const { icon, color } = getIconAndColor(type);
  
  notifications.show({
    title: title || getDefaultTitle(type),
    message,
    icon,
    color,
    autoClose,
    withBorder: true,
    radius: 'md',
    className: 'enhanced-notification',
    style: { 
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      padding: '16px 20px 16px 24px',
      position: 'relative',
    },
    classNames: {
      root: 'notification-root',
    },
    styles: (theme: MantineTheme) => ({
      root: {
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: rem(6),
          backgroundColor: theme.colors[color][6],
          borderTopLeftRadius: theme.radius.md,
          borderBottomLeftRadius: theme.radius.md,
        },
      },
    }),
    transition: slideAnimation,
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
      icon={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>}
      color={color}
      withBorder
      radius="md"
      title={
        <div style={{ fontWeight: 600, fontSize: rem(15) }}>
          {title || getDefaultTitle(type)}
        </div>
      }
      styles={(theme: MantineTheme) => ({
        root: {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: rem(6),
            backgroundColor: theme.colors[color][6],
            borderTopLeftRadius: theme.radius.md,
            borderBottomLeftRadius: theme.radius.md,
          },
          padding: '16px 20px 16px 24px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
          },
        },
      })}
      {...props}
    >
      <div style={{ fontSize: rem(14), lineHeight: 1.5 }}>
        {message}
      </div>
    </Notification>
  );
};
