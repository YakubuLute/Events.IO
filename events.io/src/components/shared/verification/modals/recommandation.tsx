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
import { useCandidateRecommandation } from '@/hooks/university/useCandidateRecommandation';
import { errorAlert, successAlert } from '@/components/shared/toastAlert';

type MiddleDataProps = {
  sx: SxProps;
  className?: string;
};

const RecommandationForm = () => {
  const {
    recommandationOpen,
    setRecommandationOpen,
    setSuccessData,
    // successData,
    verifyDetailsUserInfo,
    setVerificationSuccessOpen,
  } = useVerificationContext();

  const { mutateAsync } = useCandidateRecommandation();

  const [input, setInput] = useState('');

  const onSubmit = async () => {
    mutateAsync({
        candidateId: verifyDetailsUserInfo?.candidateId,
        recommendation: input
    },{
      onSuccess: () => {
        setRecommandationOpen(false);
    setVerificationSuccessOpen(true);
    setSuccessData({
      heading: 'Recommendation letter is added!',
      message: `Your recommendation letter for ${verifyDetailsUserInfo?.fullName} have been added successfully`,
      buttons: false,
    });

    successAlert({
      message: 'Recommmendation sent successfully',
    });

    setInput('')

      },
      onError: (error) => {
        errorAlert({
          message: error?.response?.data?.message,
        });
      },

    })
    
  };

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
              setRecommandationOpen(false);
            }}
            sx={{ display: { xs: 'none', lg: 'flex' } }}
          >
            <Cancel />
          </ButtonSpacing>
          <ButtonSpacing
            onClick={(e) => {
              e.preventDefault();
              setRecommandationOpen(false);
            }}
            className={styles.verifyDetailsMobileHeader}
            sx={{ display: { xs: 'flex', lg: 'none' } }}
          >
            <ArrowBack />
            <span>Add recommandation</span>
          </ButtonSpacing>
        </HStack>
        <VStack sx={{ padding: { xs: '0px 10px', lg: '0px 60px 0px 60px' } }}>
          <Typography
            className={styles.recomHeading}
            sx={{
              fontSize: { xs: '16px', lg: '32px' },
              display: { xs: 'none', lg: 'flex' },
            }}
          >
            Write recommandation
          </Typography>

          <div className={styles.recommForm}>
            <Typography
              className={styles.recomText}
              sx={{ marginTop: { xs: '0px', lg: '30px' } }}
            >
              Write recommandation
            </Typography>
            <div className={styles.inputContainer}>
              <Input
                className={styles.recomInput}
                onChange={(e) => setInput(e?.currentTarget?.value)}
                autoFocus
                placeholder="Start writing here..."
                value={input}
              />
              <ButtonSpacing
                className={styles.declineDetailsButton}
                onClick={onSubmit}
                sx={{
                  position: { xs: 'fixed', lg: 'static' },
                  width: { xs: '100%', lg: '160px' },
                  borderRadius: { xs: '0px', lg: '12px' },
                  backgroundColor: input === '' ? '#E2E2E4' : '#0C27BE',
                  color: input === '' ? '#B3B1B8' : 'white',
                }}
              >
                Submit
              </ButtonSpacing>
            </div>
          </div>
        </VStack>
      </VStack>
    );
  };
  return (
    <>
      <Modal
        open={recommandationOpen}
        onClose={() => setRecommandationOpen(false)}
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
          transform: recommandationOpen ? 'translateY(0)' : 'translateY(100vh)',
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

export default RecommandationForm;