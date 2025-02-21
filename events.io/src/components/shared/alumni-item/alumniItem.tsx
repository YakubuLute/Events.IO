import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import { Skeleton, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { getCurrentPlatform } from '@/utils/checkBaseUrl';
import { MailIcon } from '@/components/ui/icons';
import { TUniversityStudent } from '@/@types/university/university';
import styles from '@/app/university/classes/classes.module.scss';
import { useSendStudentMessageStore } from '@/store/candidate/useSendStudentMessageStore';
import { useChatStickyMessageStore } from '@/store/shared/useChatMessageStore';
import { useAlumniProfileStore } from '@/store/university/useAlumniProfileStore';
import { defaultUserPicture } from '../../ui/images';
import Pin from '../../university/classes/icons/pin';
import Work from '../../university/classes/icons/work';
import { CustomButton } from '../Button/Button';
import HStack from '../stacks/HStack';
import ConnectionDetailsModal from './modals/ConnectionDetailsModal';

dayjs.extend(relativeTime);

export default function AlumniItem({ ...item }: TUniversityStudent) {
  //   const { handleSendMessage } = useSendCandidateMessageStore();
  const { handleSelectAlumni } = useAlumniProfileStore();
  const { handleSelectStudent } = useSendStudentMessageStore();
  const { handleOpenChat } = useChatStickyMessageStore();

  const [showConnectionDetails, setShowConnectionDetails] = useState(false);
  const pathname = usePathname();
  const CheckPlatform = getCurrentPlatform(pathname);

  const handleClickMessage = () => {
    if (CheckPlatform === 'candidate' && !item.alreadyConnected) {
      handleSelectStudent(item);
    } else {
      handleOpenChat('chat', item.connectionId, {
        _id: item.connectionId,
        recipientProfilePhoto: item.profilePhoto,
        recipientName: `${item.personalDetails.firstName} ${item.personalDetails.lastName}`,
      });
    }
  };

  return (
    <Box className={styles.alumniItem}>
      <Image
        src={item?.profilePhoto || defaultUserPicture}
        alt={`${item.personalDetails?.firstName} Picture`}
        height={145}
        width={202}
        className={styles.alumniItemImg}
        onClick={() => handleSelectAlumni(item?._id)}
      />

      <Box className={styles.alumniItemNameWrapper}>
        <Typography
          className={styles.alumniItemName}
          onClick={() => handleSelectAlumni(item?._id)}
          textTransform={'capitalize'}
        >
          {item?.personalDetails?.firstName +
            ' ' +
            item?.personalDetails?.lastName}
        </Typography>
        {item.verified ? (
          <Image
            src={'/assets/svgs/shape.svg'}
            alt={`${item.personalDetails?.lastName}`}
            height={100}
            width={100}
            className={styles.alumniItemBadgePicture}
          />
        ) : null}
      </Box>
      <Typography className={styles.alumniItemPos} marginTop={'-10px'}>
        {item?.currentEmploymentDetails?.jobTitle?.length > 18
          ? item?.currentEmploymentDetails?.jobTitle.slice(0, 18) + '...'
          : item?.currentEmploymentDetails?.jobTitle || 'unemployed'}
      </Typography>
      <HStack className={styles.alumniItemLoc}>
        <Pin />
        <Typography className={styles.alumniItemLabel}>
          {item?.location?.country || 'N/A'}
        </Typography>
      </HStack>
      <HStack className={styles.row} sx={{ marginBottom: '16px' }}>
        <Typography className={styles.alumniItemCompany}>
          {item?.currentEmploymentDetails?.employerName ?? 'N/A'}
        </Typography>
        <HStack className={styles.alumniItemWork}>
          <Work />
          <Typography className={styles.alumniItemLabel}>
            {item?.currentEmploymentDetails?.duration
              ? dayjs(item?.currentEmploymentDetails?.duration?.start).fromNow(
                  true
                )
              : 'N/A'}
          </Typography>
        </HStack>
      </HStack>

      {CheckPlatform === 'university' ? (
        <CustomButton
          label="Message"
          startIcon={<MailIcon width={14} height={14} />}
          buttonClass="alumni_message"
          onClick={handleClickMessage}
          fullWidth
          sx={{ mt: 'auto' }}
        />
      ) : (
        <>
          <Stack
            direction="row"
            alignItems="center"
            mt={'auto'}
            gap={0.5}
            className={styles.alumni_btns_action}
          >
            {item.venue && (
              <CustomButton
                label=""
                startIcon={<StickyNote2OutlinedIcon />}
                buttonClass="alumni_paper"
                onClick={() => setShowConnectionDetails(true)}
              />
            )}

            <CustomButton
              label={item.alreadyConnected ? 'Message' : 'Connect'}
              buttonClass="alumni_message"
              onClick={handleClickMessage}
              fullWidth
            />
          </Stack>

          <ConnectionDetailsModal
            open={showConnectionDetails}
            onClose={() => setShowConnectionDetails(false)}
            data={{
              venue: item?.venue,
              note: item?.note,
            }}
          />
        </>
      )}
    </Box>
  );
}

AlumniItem.Skeleton = function AlumniItemSkeleton() {
  return (
    <Stack direction={'column'} spacing={1}>
      <Skeleton sx={{ width: '100%' }} height={100} variant="rectangular" />
      <Skeleton sx={{ width: '100%' }} height={40} variant="text" />
      <Skeleton sx={{ width: '100%' }} height={40} variant="text" />
      <Skeleton sx={{ width: '100%' }} height={40} variant="text" />
    </Stack>
  );
};
