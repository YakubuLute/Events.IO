'use client';
import React, { useEffect, useState } from 'react';

import { Input, Modal, SxProps, Typography } from '@mui/material';
import { useVerificationContext } from '@/contexts/verification';

import VStack from '../../../stacks/VStack';
import ButtonSpacing from '../../../Button/ButtonSpacing';
import Cancel from '../../../icons/cancel';
import ArrowBack from '../../../icons/arrowBackBlack';
import HStack from '../../../stacks/HStack';

import styles from '../../verification.module.scss';
import { declineStyles } from './styles';
import { useDenyEmployerVerification } from '@/hooks/employer/useEmployer';
import { EmployeeDecline } from '@/hooks/employer/dtos';

type MiddleDataProps = {
  sx: SxProps;
  className?: string;
};

const EmployeeDeclineDetails = () => {
  const {
    declineDetailsOpen,
    setDeclineDetailsOpen,
    verifyDetailsEmployeeInfo,
  } = useVerificationContext();

  const { mutateAsync, isSuccess } = useDenyEmployerVerification();

  console.log(isSuccess);

  const [input, setInput] = useState('');

  const onSubmit = async () => {
    const submitData: EmployeeDecline = {
      id: verifyDetailsEmployeeInfo?._id.toString(),
      response: 'DECLINED',
      // declineReason: input,
    };
    await mutateAsync(submitData);
  };

  useEffect(() => {
    if (isSuccess) {
      setDeclineDetailsOpen(false);
    }
  }, [isSuccess, setDeclineDetailsOpen]);

  const MiddleData = ({ sx }: MiddleDataProps) => {
    return (
      <VStack className={styles.declineDetailsContainer} sx={sx}>
        <HStack
          sx={declineStyles.wrapperStyle}
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
            onClick={onSubmit}
            sx={declineStyles.submitStyle(input)}
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
        sx={declineStyles.modalViewStyle(declineDetailsOpen)}
      >
        <MiddleData
          sx={{ height: '100%', backgroundColor: '#f7f8fa !important' }}
        />
      </VStack>
    </>
  );
};

export default EmployeeDeclineDetails;
