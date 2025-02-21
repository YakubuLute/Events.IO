'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  Box,
  CardActionArea,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import { CustomBadge } from '@/components/shared';
import { NotificationDTO } from '@/hooks/shared/dtos';
import {
  // useGetSharedNotificationId,
  useGetSharedNotifications,
} from '@/hooks/shared/useNotifcications';
import notificationMessageIcon from '@/public/icons/notificationMessage.svg';
import { handleNotificationType, truncateString } from '@/utils';
import ButtonSpacing from '../Button/ButtonSpacing';
import HStack from '../stacks/HStack';
import VStack from '../stacks/VStack';
import styles from './notification.module.scss';

// import { Link } from 'react-scroll';

dayjs.extend(relativeTime);

export const getTimeAgo = (dateTIme: string) => {
  const dateCreatedTime = dayjs(dateTIme);
  return dateCreatedTime.fromNow();
};

interface NotificationSkeleton {
  num?: number;
}
const NotificationMessageSkeleton: React.FC<
  NotificationSkeleton
> = ({ num = 4 }) => {
  const arr = Array(num).fill(0);
  return (
    <>
      {arr.map((_, index) => (
        <HStack key={index} className={styles.notificationMessageContainer}>
          <VStack className={styles.notificationMessageIcon}>
            <CustomBadge
              count={' '}
              variant="dot"
              name="company"
              badgeClass="nav_badge"
            >
              {/* <Skeleton circle={true} height={32} width={32} /> */}
            </CustomBadge>
          </VStack>
          <VStack className={styles.notificationMessageTexts}>
            <Typography className={styles.notificationMessageTitle}>
              <Skeleton width={200} />
            </Typography>
            <Typography className={styles.notificationMessageBody}>
              <Skeleton width={400} />
            </Typography>
            <ButtonSpacing className={styles.notificationMessageLink}>
              <Skeleton width={100} />
            </ButtonSpacing>
          </VStack>
          <Stack className={styles.notificationMessageTime}>
            <Skeleton width={100} />
          </Stack>
        </HStack>
      ))}
      ;
    </>
  );
};

type MessageProps = {
  notification: NotificationDTO;
};

export const NotificationsMessages: React.FC<MessageProps> = ({
  notification,
}) => {
  const queryClient = useQueryClient();
  const notificationTypes = handleNotificationType(notification);

  const [notificationId, setNotificationId] = React.useState<string | null>(
    null
  );

  // const { data: notificationData } = useGetSharedNotificationId(
  //   notificationId as string
  // );

  useEffect(() => {
    if (notificationId) {
      // refetch();
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationId]);

  return (
    <CardActionArea
      {...(notificationTypes?.urlPath && {
        component: Link,
        href: notificationTypes.urlPath,
      })}
      sx={{ cursor: notificationTypes?.urlPath ? "pointer" : "default" }}
      className={styles.cardActionArea}
      onClick={(e) => {
        e.stopPropagation();
        console.log('notification clik', notification?._id);
        setNotificationId(notification?._id);
      }}
    >
      <HStack
        className={`${styles.notificationMessageContainer} ${notification?.read ? styles.read : styles.unread
          } `}
      >
        <VStack className={styles.notificationMessageIcon}>
          {notification?.read ? (
            <Image
              src={notification?.thumbnail || notificationMessageIcon}
              alt="NotificationMessageIcon"
              width={32}
              height={32}
            />
          ) : (
            <CustomBadge
              count={' '}
              variant="dot"
              name="company"
              badgeClass="nav_badge"
            >
              <Image
                src={notification?.thumbnail || notificationMessageIcon}
                alt="NotificationMessageIcon"
                width={32}
                height={32}
              />
            </CustomBadge>
          )}
        </VStack>
        <VStack className={styles.notificationMessageTexts}>
          <Typography className={styles.notificationMessageTitle}>
            {notification?.title}
          </Typography>
          <Typography className={styles.notificationMessageBody}>
            {notification?.summary}
          </Typography>
          {notificationTypes ? (
            <Link href={notificationTypes.urlPath}>
              <ButtonSpacing className={styles.notificationMessageLink}>
                {notificationTypes.text}
              </ButtonSpacing>
            </Link>
          ) : null}
        </VStack>
        <Stack className={styles.notificationMessageTime}>
          {getTimeAgo(notification?.dateCreated as string)}
        </Stack>
      </HStack>
    </CardActionArea >
  );
};

const SharedNotifications: React.FC = () => {
  const {
    data: dataNotifications,
    isPending: dataNotificationsLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetSharedNotifications({ page: 1, itemsPerPage: 5 });

  const dataNotificationsPage = dataNotifications?.pages.map(
    (page) => page?.items
  );

  // console.log('dataNotificationsPage', dataNotificationsPage);

  const observer = useRef<IntersectionObserver | null>(null);
  const bottomBoundaryRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    if (!dataNotificationsLoading && bottomBoundaryRef.current) {
      observer.current = new IntersectionObserver(handleObserver, {
        threshold: 1.0,
      });
      observer.current.observe(bottomBoundaryRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [dataNotificationsLoading, handleObserver]);

  return (
    <Box sx={{ px: { sm: '16px', lg: '24px' } }}>
      <Stack mt={4} mb={2} ml={1}>
        <Typography fontSize={22} fontWeight={600} color="#110C22">
          Notifications
        </Typography>
      </Stack>
      <Box className={styles.notification}>
        <Stack className={styles.notificationContent}>
          {dataNotificationsLoading ? (
            <NotificationMessageSkeleton num={10} />
          ) : (
            <>
              {dataNotificationsPage?.map((page) =>
                page?.map((notification: NotificationDTO) => (
                  <NotificationsMessages
                    key={notification._id}
                    notification={{ ...notification }}
                  />
                ))
              )}
            </>
          )}

          {isFetchingNextPage && <NotificationMessageSkeleton num={3} />}

          {!hasNextPage && !isFetchingNextPage && (
            <Typography
              sx={{ mx: 'auto' }}
              className={styles.endOfPageText}
              color="textSecondary"
            >
              End of Page
            </Typography>
          )}

          <div ref={bottomBoundaryRef} />

          {/* {hasNextPage && (
            <ButtonSpacing
              className={styles.notificationLoadMoreBtn}
              onClick={fetchNextPage}
            >
              Load more
            </ButtonSpacing>
          )} */}
        </Stack>
      </Box>
    </Box>
  );
};

export default SharedNotifications;
