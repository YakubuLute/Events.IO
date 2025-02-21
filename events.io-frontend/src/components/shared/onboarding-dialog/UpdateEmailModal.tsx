import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { decodeAxiosError } from '@/utils/shared/axiosError';
import {
  useSendEmailVerification,
  useUpdatedCandidateDetails,
} from '@/hooks/candidate';
import { useOnboardingDialogContext } from '@/contexts/onboardingContext';
import { ErrorResponse } from '@/@types/shared/type';
import { CustomButton } from '../Button/Button';
import CustomDialog from '../dialog/CustomDialog';
import FieldErrorMessage from '../fieldErrorMessage/fieldErrorMessage';
import { CustomInput } from '../Input/Input';
import { errorAlert, successAlert } from '../toastAlert';
import styles from './styles.module.scss';

type Props = {
  open: boolean;
  onClose: () => void;
  onCloseOnboardingList: () => void;
};

const Schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Enter a valid email address',
    }),
});

type FormValues = z.infer<typeof Schema>;

const UpdateEmailModal = ({ onClose, open, onCloseOnboardingList }: Props) => {
  const { candidateProfileData } = useOnboardingDialogContext();
  const queryClient = useQueryClient();

  const { refetch } = useSendEmailVerification();

  const { mutate: updateEmail, isPending: isSubmitting } =
    useUpdatedCandidateDetails({
      onSuccess: () => {
        refetch();
        onClose();
        successAlert({
          message: 'Your email has been updated successfully.',
        });
        queryClient.invalidateQueries({
          queryKey: ['candidateProfile'],
        });
        onCloseOnboardingList();
      },
      onError: (error: ErrorResponse) => {
        errorAlert({ message: decodeAxiosError(error) });
      },
    });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: candidateProfileData?.email,
    },
  });

  const isSameEmail = candidateProfileData?.email === watch('email');
  const emptyEmail = watch('email') === '';

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    updateEmail({
      email: data.email,
    });
  };

  const checkDisabled = () => {
    return isSubmitting || isSameEmail || emptyEmail;
  };

  return (
    <CustomDialog open={open} onClose={onClose} title="Update Email">
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <Typography className={styles.label}>
            Please enter your email address to edit
          </Typography>
          <FieldErrorMessage name="email" errors={errors}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  value={value}
                  onChange={onChange}
                  type="email"
                  placeholder="Enter your email"
                />
              )}
            />
          </FieldErrorMessage>
        </div>
        <div className={styles.btnBox}>
          <CustomButton
            label="Cancel"
            onClick={onClose}
            type={'button'}
            className={[styles.btn, styles.close].join(' ')}
          />
          <CustomButton
            label="Update Email"
            type="submit"
            className={[styles.btn, !checkDisabled() ? styles.save : null].join(
              ' '
            )}
            isLoading={isSubmitting}
            disabled={checkDisabled()}
          />
        </div>
      </form>
    </CustomDialog>
  );
};

export default UpdateEmailModal;
