import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IconButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { CustomButton } from '@/components/shared';
import ConnectionModal from '@/components/shared/connect-candidate/ConnectionModal';
import NoteModal from '@/components/shared/connect-candidate/NoteModal';
import InfoPopOver from '@/components/shared/popover/InfoPopOver';
import {
  BriefCaseIcon,
  LocationCircleIcon,
  TimeIcon,
  VaurseVerifiedLogo,
} from '@/components/shared/SVG-components';
import FileIcon from '@/components/shared/SVG-components/FileIcon';
import { useHeaderContext } from '@/contexts/headerContext';
import { NetworkItem } from '@/@types/shared/type';
import { useChatStickyMessageStore } from '@/store/shared/useChatMessageStore';
import { useAlumniProfileStore } from '@/store/university';
import { truncateString } from '@/utils';
import styles from './styles.module.scss';

dayjs.extend(relativeTime);

type Props = {
  network: NetworkItem;
  platform?: 'university' | 'candidate' | 'employer';
};

const NetworkCard = ({ network, platform }: Props) => {
  const { handleSelectAlumni } = useAlumniProfileStore();
  const { handleOpenChat } = useChatStickyMessageStore();
  const [openConnectionModal, setOpenConnectionModal] = useState(false);
  const [openNotesModal, setOpenNotesModal] = useState(false);
  const { screenSize } = useHeaderContext();
  const isLargeScreen = screenSize === 'desktop' || screenSize === 'laptop';
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPopover = Boolean(anchorEl);

  const onClosePopper = () => {
    setAnchorEl(null);
  };

  const onViewVerified = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickMessageBtn = () => {
    if (isLargeScreen) {
      handleOpenChat('chat', network?.connectionId, {
        _id: network?.connectionId,
        recipientProfilePhoto: network?.profilePhoto,
        recipientName: `${network?.personalDetails?.firstName} ${network?.personalDetails?.lastName}`,
        recipientId: network?._id,
      });
    } else {
      const connectData = {
        _id: network?.connectionId,
        recipientProfilePhoto: network?.profilePhoto,
        recipientName: `${network?.personalDetails?.firstName} ${network?.personalDetails?.lastName}`,
        recipientId: network?._id,
      };
      localStorage.setItem('connectData', JSON.stringify(connectData));
      router.push(`/${platform}/messages`);
    }
  };

  return (
    <>
      <div className={styles.networkCard}>
        <div className={styles.imageWrapper}>
          <div className={styles.imageBox}>
            <Image
              src={
                network?.profilePhoto ||
                '/assets/images/user-default-image-sq.svg'
              }
              alt={`${network?.personalDetails?.firstName} Profile Picture`}
              width={150}
              height={150}
              priority
            />
          </div>
        </div>
        <div className={styles.topBox}>
          <Typography
            noWrap
            className={styles.nameText}
            role="button"
            tabIndex={0}
            onClick={() => handleSelectAlumni(network?._id)}
          >{`${network?.personalDetails?.firstName?.toLowerCase()} ${network?.personalDetails?.lastName?.toLowerCase()}`}</Typography>
          {network?.faceVerified && network?.identityVerified ? (
            <IconButton
              aria-owns={openPopover ? 'mouse-over-popover' : undefined}
              className={styles.iconBtn}
              sx={{ p: '4px' }}
              onMouseEnter={onViewVerified}
              aria-haspopup="true"
            >
              <VaurseVerifiedLogo width={14} height={14} color="#1C92FF" />
            </IconButton>
          ) : null}
        </div>
        <div className={styles.iconTextBox}>
          <BriefCaseIcon />
          <Typography className={styles.text} noWrap>
            {network?.currentEmploymentDetails?.jobTitle || 'unemployed'}
          </Typography>
        </div>
        <div className={styles.iconTextBox}>
          <LocationCircleIcon />
          <Typography className={styles.text} noWrap>
            {network?.location?.country || 'N/A'}
          </Typography>
        </div>
        <div className={styles.dividedBox}>
          <div className={styles.companyBox}>
            <Typography className={styles.companyName}>
              {network.currentEmploymentDetails &&
              network.currentEmploymentDetails.employerName
                ? truncateString(
                    network?.currentEmploymentDetails?.employerName,
                    15
                  )
                : 'N/A'}
            </Typography>
          </div>
          <div className={styles.durationBox}>
            <TimeIcon />
            <Typography className={styles.durationText} noWrap>
              {network?.currentEmploymentDetails?.duration
                ? dayjs(
                    network?.currentEmploymentDetails?.duration?.start
                  ).fromNow(true)
                : 'N/A'}
            </Typography>
          </div>
        </div>
        <div className={styles.btnGroup}>
          {platform === 'university' ? (
            <CustomButton
              variant="contained"
              label="Message"
              className={styles.messageBtn}
              fullWidth
              onClick={handleClickMessageBtn}
            />
          ) : (
            <>
              {network?.venue ? (
                <IconButton
                  className={styles.iconBtn}
                  onClick={() => setOpenNotesModal(true)}
                >
                  <FileIcon />
                </IconButton>
              ) : null}

              {platform == "candidate" ? (network?.alreadyConnected ? (
                network?.connectionStatus === 'accepted' ? (
                  <CustomButton
                    variant="contained"
                    label="Message"
                    className={styles.messageBtn}
                    fullWidth
                    onClick={handleClickMessageBtn}
                  />
                ) : network?.connectionStatus === 'pending' ? (
                  <CustomButton
                    variant="outlined"
                    label="Pending"
                    className={styles.messageBtn}
                    fullWidth
                    disabled
                  />
                ) : null
              ) : (
                <CustomButton
                  variant="outlined"
                  label="Connect"
                  className={styles.connectBtn}
                  fullWidth
                  onClick={() => setOpenConnectionModal(true)}
                />
              )) : null}
            </>
          )}
        </div>
      </div>
      {openConnectionModal ? (
        <ConnectionModal
          connection={network}
          onClose={() => setOpenConnectionModal(false)}
          open={openConnectionModal}
        />
      ) : null}
      {openNotesModal ? (
        <NoteModal
          connection={network}
          onClose={() => setOpenNotesModal(false)}
          open={openNotesModal}
        />
      ) : null}
      {network?.identityVerified && network?.faceVerified && (
        <InfoPopOver
          anchorEl={anchorEl}
          handleClose={onClosePopper}
          network={network}
          open={openPopover}
        />
      )}
    </>
  );
};

export default NetworkCard;
