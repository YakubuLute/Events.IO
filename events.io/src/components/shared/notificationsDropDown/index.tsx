import React, { useState } from 'react';
import { Stack } from '@mui/system';

import { ButtonSpacing } from '@/components/shared';
import { NotificationsMessages } from '@/components/shared/notification';
import { useGetSharedNotifications } from '@/hooks/shared/useNotifcications';
import { NotificationDTO } from '@/hooks/shared/dtos';

import notificationMessageIcon from '@/public/icons/notificationMessage.svg';

import styles from '../notification/notification.module.scss';

export default function NotificationDropdown() {
  const [showNotifData, setShowNotifData] = useState(false);

  const { data: dataNotifications, isPending: dataNotificationsLoading } =
    useGetSharedNotifications({ page: 1, itemsPerPage: 10 });

  const notifData = dataNotifications?.items;

  const dataFiltered = showNotifData ? notifData?.slice(0, 3) : notifData;
  return (
    <Stack className={styles.notifications} style={{ display: 'none' }}>
      <Stack
        style={{
          maxHeight: `${!showNotifData ? '46vh' : '388px'}`,
        }}
        className={styles.notificationOverflow}
      >
        {dataNotificationsLoading ? (
          <Stack justifyContent="center" alignItems="center">
            Loading notifications...
          </Stack>
        ) : (
          dataFiltered?.map((notification: NotificationDTO) => (
            <div
              className={styles.notificationMessageContainer}
              key={notification._id}
            >
              <NotificationsMessages
                notification={{
                  ...notification,
                  thumbnail: notificationMessageIcon
                }}
              />
            </div>
          ))
        )}
      </Stack>

      <ButtonSpacing
        className={styles.notificationViewAllBtn}
        onClick={() => setShowNotifData(!showNotifData)}
        as={'span'}
      >
        {!showNotifData ? 'View Less' : 'View All'}
      </ButtonSpacing>
    </Stack>
  );
}
