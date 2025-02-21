'use client';
import { useVerificationContext } from '@/contexts/verification';
import { Modal, SxProps, Typography } from '@mui/material';
import React from 'react';
import VStack from '../../stacks/VStack';
import styles from '../verification.module.scss';
import ButtonSpacing from '../../Button/ButtonSpacing';
import Cancel from '../../icons/cancel';
import successImg from '@/public/images/success-thumbs-up-icon.png';
import Image from 'next/image';
import HStack from '../../stacks/HStack';
type MiddleDataProps = {
  sx: SxProps;
  className?: string;
};

const VerificationSuccess = () => {
  const {
    verificationSuccessOpen,
    setVerificationSuccessOpen,
    setRecommandationOpen,
    successData,
    blockChainLoading
  } = useVerificationContext();

  const MiddleData = ({ sx }: MiddleDataProps) => {
    return (
      <VStack className={styles.verificationSuccContainer} sx={sx}>
        <HStack sx={{width: "100%", padding: "16px 24px", borderBottom: "solid 1px #F3F3F4"}}>
          <h6 className={styles.veSuccessModalHeading}>
            Success
          </h6>
          <ButtonSpacing
            className={styles.cancelBtn}
            onClick={(e) => {
              e.preventDefault();
              setVerificationSuccessOpen(false);
            }}
            sx={{
              display: {
                xs: 'none',
                lg: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
              },
            }}
          >
            <Cancel />
          </ButtonSpacing>
        </HStack>

        <VStack sx={{
          width: "100%",
          padding: "24px",
          alignItems: "center"
        }}>
          {/* <Typography className={styles.title}>{successData?.heading}</Typography> */}
          <Image
            src={successImg}
            alt=""
            className={styles.success_img}
          />
          <Typography className={styles.success_title}>Thank you</Typography>
          <Typography className={styles.message}>
            Candidate Verification was successful.
          </Typography>
        </VStack>

        {successData.buttons && (
          <VStack sx={{
            width: "100%",
            padding: "0 24px 24px 24px",
            alignItems: "center"
          }}>
            <ButtonSpacing className={styles.viewButton}>
              View verification on blockchain
            </ButtonSpacing>
            <ButtonSpacing
              className={styles.recomButton}
              onClick={() => {
                setVerificationSuccessOpen(false);
                setRecommandationOpen(true);
              }}
            >
              Leave Recommendation
            </ButtonSpacing>
          </VStack>
        )}
      </VStack>
    );
  };

  return (
    <>
      <Modal
        open={verificationSuccessOpen && !blockChainLoading}
        onClose={() => setVerificationSuccessOpen(false)}
        sx={{
          display: { xs: 'none', lg: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MiddleData sx={{ maxWidth: '540px', borderRadius: '12px' }} />
      </Modal>
      <VStack
        className={styles.verifyDetailsMobileContainer}
        sx={{
          display: { xs: 'flex', lg: 'none' },
          transform: verificationSuccessOpen
            ? 'translateY(0)'
            : 'translateY(100vh)',
          transition: 'transform 0.5s',
        }}
      >
        <MiddleData
          sx={{ height: '100%', backgroundColor: '#f7f8fa !important' }}
        />
      </VStack>
    </>
  );
};

export default VerificationSuccess;