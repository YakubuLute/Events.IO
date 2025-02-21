'use client';
import { useVerificationContext } from '@/contexts/verification';
import { Input, Modal, SxProps, Typography } from '@mui/material';
import React, { useState } from 'react';
import VStack from '../../stacks/VStack';
import styles from '../verification.module.scss';
import ButtonSpacing from '../../Button/ButtonSpacing';
import Cancel from '../../icons/cancel';
import ArrowBack from '../../icons/arrowBackBlack';
import HStack from '../../stacks/HStack';

type MiddleDataProps = {
  sx: SxProps;
  className?: string;
};

const DeclineDetails = () => {
  const { declineDetailsOpen, setDeclineDetailsOpen } =
    useVerificationContext();

  const [input, setInput] = useState('');

  //   const onSubmit = (data: FormData) => console.log(data);

  const MiddleData = ({ sx }: MiddleDataProps) => {
    return (
      <VStack className={styles.declineDetailsContainer} sx={sx}>
        <HStack
          sx={{
            justifyContent: { xs: 'flex-start', lg: 'flex-end' },
            padding: { xs: '12px 12px', lg: '24px 24px' },
            backgroundColor: { xs: 'white', lg: 'unset' },
            marginBottom: { xs: '20px', lg: '0px' },
          }}
          className={styles.verifyDetailsCancelButton}
        >
          <ButtonSpacing
            onClick={(e) => {
              e.preventDefault();
              setDeclineDetailsOpen(false);
            }}
            sx={{ display: { xs: 'none', lg: 'flex' } }}
          >
            <Cancel />
          </ButtonSpacing>
          <ButtonSpacing
            onClick={(e) => {
              e.preventDefault();
              setDeclineDetailsOpen(false);
            }}
            className={styles.verifyDetailsMobileHeader}
            sx={{ display: { xs: 'flex', lg: 'none' } }}
          >
            <ArrowBack />
            <span>Reason for Decline</span>
          </ButtonSpacing>
        </HStack>
        <VStack sx={{ padding: { xs: '0px 10px', lg: '0px 60px 0px 60px' } }}>
          <Typography
            className={styles.verifyDetailsTitle}
            sx={{
              fontSize: { xs: '16px', lg: '32px' },
              display: { xs: 'none', lg: 'flex' },
            }}
          >
            Reason for Decline
          </Typography>

          <Typography
            className={styles.declineDetailsSubTitle}
            sx={{ marginTop: { xs: '0px', lg: '30px' } }}
          >
            Choose Reason for Decline
          </Typography>
          <Input
            className={styles.declineDetailsTextArea}
            onChange={(e) => setInput(e?.currentTarget?.value)}
            autoFocus
            value={input}
          />
          <ButtonSpacing
            className={styles.declineDetailsButton}
            sx={{
              position: { xs: 'fixed', lg: 'static' },
              width: { xs: '100%', lg: '160px' },
              borderRadius: { xs: '0px', lg: '12px' },
              backgroundColor: input === '' ? '#E2E2E4' : '#0C27BE',
              color: input === '' ? '#B3B1B8' : 'white',
            }}
          >
            Save
          </ButtonSpacing>
        </VStack>
      </VStack>
    );
  };
  return (
    <>
      <Modal
        open={declineDetailsOpen}
        onClose={() => setDeclineDetailsOpen(false)}
        sx={{
          display: { xs: 'none', lg: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MiddleData sx={{ maxWidth: '900px', borderRadius: '12px' }} />
      </Modal>
      <VStack
        className={styles.verifyDetailsMobileContainer}
        sx={{
          display: { xs: 'flex', lg: 'none' },
          transform: declineDetailsOpen ? 'translateY(0)' : 'translateY(100vh)',
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

export default DeclineDetails;
