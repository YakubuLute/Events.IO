'use client';

import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Modal, SxProps, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useVerificationContext } from '@/contexts/verification';
import { CustomButton } from '../../Button/Button';
import ButtonSpacing from '../../Button/ButtonSpacing';
import ArrowBack from '../../icons/arrowBackBlack';
import Cancel from '../../icons/cancel';
import HStack from '../../stacks/HStack';
import VStack from '../../stacks/VStack';
import styles from '../verification.module.scss';

type MiddleDataProps = {
  sx: SxProps;
  className?: string;
};

const formSchema = z.object({
  reason: z.string().nonempty().min(1),
});
type TFormSchema = z.infer<typeof formSchema>;

const DeclineDetails = ({ isDeclining, handleSubmitDeclination }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const { declineDetailsOpen, setDeclineDetailsOpen } =
    useVerificationContext();

  useEffect(() => {
    setValue('reason', '');
  }, [setValue]);

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
          <Controller
            name="reason"
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                className={styles.declineDetailsTextArea}
                autoFocus
                onBlur={onBlur}
                value={value}
                onChange={onChange}
              />
            )}
          />

          <CustomButton
            type="button"
            label="Save"
            className="text-white bg-primary px-20 py-18  text-lg rounded-[12px] max-w-[160px]"
            onClick={handleSubmit(handleSubmitDeclination)}
            disabled={!!errors.reason}
            isLoading={isDeclining}
          />
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
