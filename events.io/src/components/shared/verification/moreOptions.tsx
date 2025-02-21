// import { useVerificationContext } from '@/contexts/verification';
import React from 'react';
import VStack from '../../stacks/VStack';
import styles from '../verification.module.scss';
import { useVerificationContext } from '@/contexts/verification';
import { Modal, Typography } from '@mui/material';
import HStack from '../../stacks/HStack';
import ButtonSpacing from '../../Button/ButtonSpacing';
import Cancel from '../../icons/cancel';
import Verify from '../../icons/verify';
import Decline from '../../icons/decline';

const MoreOptions = () => {
  const {
    mobileOptionsOpen,
    setMobileOptionsOpen,
    setVerifyDetailsOpen,
    setDeclineDetailsOpen,
  } = useVerificationContext();
  return (
    <Modal
      open={mobileOptionsOpen}
      onClose={() => setMobileOptionsOpen(false)}
      sx={{
        display: { xs: 'flex', sm: 'none' },
        alignItems: 'center',
        justifyContent: 'center',
        paddingX: '18px',
      }}
    >
      <VStack className={styles.moreOptionsContainer}>
        <HStack className={styles.moreOptionsHeader}>
          <Typography className={styles.moreOptionsTitle}>
            Verification Options
          </Typography>
          <ButtonSpacing>
            <Cancel />
          </ButtonSpacing>
        </HStack>

        <VStack className={styles.moreOptionsInnerContainer}>
          <ButtonSpacing
            className={styles.moreOptionsRow}
            onClick={(e) => {
              e.preventDefault();
              setMobileOptionsOpen(false);
              setVerifyDetailsOpen(true);
            }}
          >
            <Verify
              sx={{
                width: { xs: '24px', lg: '30px' },
                height: { xs: '24px', lg: '30px' },
              }}
            />
            <Typography
              className={styles.moreOptionsLabel}
              sx={{ color: '#553ADE' }}
            >
              Verify
            </Typography>
          </ButtonSpacing>

          <ButtonSpacing
            className={styles.moreOptionsRow}
            onClick={(e) => {
              e.preventDefault();
              setMobileOptionsOpen(false);
              setDeclineDetailsOpen(true);
            }}
          >
            <Decline
              sx={{
                width: { xs: '24px', lg: '30px' },
                height: { xs: '24px', lg: '30px' },
              }}
            />
            <Typography
              className={styles.moreOptionsLabel}
              sx={{ color: '#F03D3D' }}
            >
              Decline
            </Typography>
          </ButtonSpacing>
        </VStack>
      </VStack>
    </Modal>
  );
};

export default MoreOptions;
