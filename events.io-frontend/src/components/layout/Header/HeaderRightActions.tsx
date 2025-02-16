import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';

import Menu from '@/components/shared/icons/menu';
import Messages from '@/components/shared/icons/messages';
import Notif from '@/components/shared/icons/notif';
import Wallet from '@/components/shared/icons/wallet';
import { NotificationsMessages } from '@/components/shared/notification';
import { profilePictureSVGCircle } from '@/components/ui/images';
import { useGetCurrentUserBasicInfo } from '@/hooks/shared';
import { NotificationDTO } from '@/hooks/shared/dtos';
import { useGetSharedNotifications } from '@/hooks/shared/useNotifcications';
import { socket } from '@/services/socket.service';
import { useUser } from '@/contexts/userContext';
import { SettingsItem } from '@/constants/NavLink';
import Flag from '@/public/icons/england_flag.webp';
import { formatString, isSocialProfileLink } from '@/utils';
import ButtonSpacing from '../../shared/Button/ButtonSpacing';
import { AccountMenu } from './AccountMenu/AccountMenu';
import styles from './header.module.scss';
import { NotificationBadge, NotificationText } from './NotificationBadge';

interface ActionsProps {
  window?: () => Window;
  verification?: boolean;
  invite?: boolean;
  university: boolean;
  company: boolean;
  referrals: boolean;
  center: boolean;
  wallet: boolean;
  settings: SettingsItem[];
  hiddenIcons?: boolean;
  platform?: string;
}

export const HeaderRightActions: React.FC<ActionsProps> = ({
  verification,
  center,
  invite,
  university,
  settings,
  company,
  referrals,
  hiddenIcons,
}) => {
  // hooks
  const path = usePathname();
  const pathArray = path.split('/');
  const platformPath = pathArray[1];
  const { currentUserProfilePicture } = useUser();

  // States
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [notify, setNotify] = useState({
    total: 0,
    messages: 0,
    activeStatus: 'inactive',
    wallet: 0,
    referral: 0,
    requests: 0,
  });
  const [showMoreNotifications, setShowNotifications] = useState(false);
  const timestampQueryParam = useMemo(() => `?&timestamp=${Date.now()}`, []);
  const [userProfilePhoto, setUserProfilePhoto] = useState('');

  // Custom Hooks
  const { data: currentUserInfo } = useGetCurrentUserBasicInfo();

  const { data: dataNotifications, isLoading: notificationsLoading } =
    useGetSharedNotifications({ page: 1, itemsPerPage: 10 });

  const notifData = dataNotifications?.pages[0]?.items;
  const dataFiltered = !showMoreNotifications ? notifData?.slice(0, 3) : notifData;

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  useEffect(() => {
    socket.on('notifications:count:unseen', (data) => {
      if (data) {
        setNotify(data);
      }
    });
    return () => {
      socket.off('notifications:count:unseen');
    };
  }, []);

  useEffect(() => {
    if (currentUserProfilePicture) {
      setUserProfilePhoto(currentUserProfilePicture);
    } else if (currentUserInfo && currentUserInfo.profilePhoto) {
      if (isSocialProfileLink(currentUserInfo.profilePhoto)) {
        setUserProfilePhoto(currentUserInfo.profilePhoto);
      } else {
        setUserProfilePhoto(currentUserInfo.profilePhoto + timestampQueryParam);
      }
    } else {
      setUserProfilePhoto(profilePictureSVGCircle);
    }
  }, [currentUserInfo, currentUserProfilePicture, timestampQueryParam]);

  return (
    <>
      <Box sx={{ display: { xs: 'flex' } }} className={styles.wrapper}>
        <Stack
          spacing={1}
          direction="row"
          sx={{ color: 'action.active' }}
          className={styles.right_link_icons}
        >
          {/* if verification is true, add a "Verification" link */}
          {verification && (
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link
                href={`/${platformPath}/verification`}
                className={styles.nav_item_link}
              >
                <Typography
                  component="p"
                  variant="body2"
                  className={styles.linkText}
                >
                  Verifications
                </Typography>
              </Link>
            </Box>
          )}

          {center && (
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link
                href={`/${platformPath}/verification`}
                className={[
                  styles.nav_item_link,
                  path === `/${platformPath}/verification` ? styles.active : '',
                ].join(' ')}
              >
                <Typography
                  component="p"
                  variant="body2"
                  className={styles.linkText}
                >
                  Verification Center
                </Typography>
              </Link>
            </Box>
          )}

          {university && (
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link
                href={`/${platformPath}/education`}
                className={[
                  styles.nav_item_link,
                  path === `/${platformPath}/education` ? styles.active : null,
                ].join(' ')}
              >
                <Typography
                  component="p"
                  variant="body2"
                  className={styles.linkText}
                >
                  University
                </Typography>
              </Link>
            </Box>
          )}

          {company && (
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link
                href={`/${platformPath}/company`}
                className={styles.nav_item_link}
              >
                <Typography
                  component="p"
                  variant="body2"
                  className={styles.linkText}
                >
                  Company
                </Typography>
              </Link>
            </Box>
          )}

          {referrals && (
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link
                href={`/${platformPath}/referrals`}
                className={[
                  styles.nav_item_link,
                  path === `/${platformPath}/referrals` ? styles.active : null,
                ].join(' ')}
              >
                <NotificationText dot={notify.referral > 0}>
                  <Typography
                    component="p"
                    variant="body2"
                    className={styles.linkText}
                  >
                    Referrals
                  </Typography>
                </NotificationText>
              </Link>
            </Box>
          )}

          {/* if invite is true, add a "Invite" link */}
          {invite && (
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link
                href={`/${platformPath}/invite`}
                className={[
                  styles.nav_item_link,
                  path === `/${platformPath}/invite` ? styles.active : null,
                ].join(' ')}
              >
                <Typography
                  component="p"
                  variant="body2"
                  className={styles.linkText}
                >
                  Invite
                </Typography>
              </Link>
            </Box>
          )}

          {!hiddenIcons && (
            <Link
              href={`/${platformPath}/wallet`}
              className={styles.nav_item_icon_link}
            >
              <NotificationBadge dot={notify.wallet > 0}>
                <Wallet />
              </NotificationBadge>
            </Link>
          )}

          <div className={styles.flag_icon}>
            <Image src={Flag} alt="flag" width={20} height={15} />
          </div>

          {!hiddenIcons && (
            <>
              <Link
                href={`/${platformPath}/messages`}
                className={styles.nav_item_icon_link}
              >
                <NotificationBadge
                  dot={notify.messages > 0 || notify.requests > 0}
                  isPendingRequests={notify.requests > 0}
                >
                  <Messages />
                </NotificationBadge>
              </Link>
              <div className={styles.nav_item_notifications}>
                <Link
                  href={`/${platformPath}/notification`}
                  className={styles.nav_item_icon_link}
                >
                  <NotificationBadge dot={notify.total > 0}>
                    <Notif />
                  </NotificationBadge>
                </Link>

                <Stack className={styles.notifications}>
                  <Stack
                    style={{
                      maxHeight: `${!showMoreNotifications ? '46vh' : '388px'}`,
                    }}
                    className={styles.notificationOverflow}
                  >
                    {notificationsLoading ? (
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
                            notification={{ ...notification }}
                          />
                        </div>
                      ))
                    )}
                  </Stack>

                  <ButtonSpacing
                    className={styles.notificationViewAllBtn}
                    onClick={() => setShowNotifications(!showMoreNotifications)}
                  >
                    {showMoreNotifications ? 'View Less' : 'View More'}
                  </ButtonSpacing>
                </Stack>
              </div>
            </>
          )}
        </Stack>

        {currentUserInfo && (
          <div className={styles.user_info}>
            {!hiddenIcons && (
              <Box className={styles.user_name_welcom}>
                <Typography
                  component="small"
                  variant="caption"
                  classes={{ root: styles.user }}
                >
                  Hello, Welcome
                </Typography>
                <Typography component="p" variant="body2">
                  <span>
                    {`${currentUserInfo?.firstName
                      ? formatString(currentUserInfo?.firstName)
                      : ''
                      } ${currentUserInfo?.lastName
                        ? formatString(currentUserInfo?.lastName)
                        : ''
                      }`}
                  </span>
                </Typography>
              </Box>
            )}
            <Tooltip title="Open settings" placement="bottom-start">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Image
                  alt={currentUserInfo?.firstName ?? 'current_user'}
                  src={userProfilePhoto}
                  className={styles.profilePhoto}
                  width={36}
                  height={36}
                />
              </IconButton>
            </Tooltip>
          </div>
        )}

        <AccountMenu
          anchorElUser={anchorElUser}
          setAnchorElUser={setAnchorElUser}
          settings={settings}
        />

        {!hiddenIcons && <Menu />}
      </Box>
    </>
  );
};
