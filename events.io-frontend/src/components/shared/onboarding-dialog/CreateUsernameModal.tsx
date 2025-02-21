import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { decodeAxiosError } from '@/utils/shared/axiosError';
import { useUpdatedCandidateUserName } from '@/hooks/candidate';
import { useOnboardingDialogContext } from '@/contexts/onboardingContext';
import { APISuccessResponse, ErrorResponse } from '@/@types/shared/type';
import { CustomButton } from '../Button/Button';
import CustomDialog from '../dialog/CustomDialog';
import FieldErrorMessage from '../fieldErrorMessage/fieldErrorMessage';
import { CustomInput } from '../Input/Input';
import { errorAlert, successAlert } from '../toastAlert';
import styles from './styles.module.scss';

type Props = {
  open: boolean;
  onClose: () => void;
};

const Schema = z.object({
  username: z.string({ required_error: 'Username field is required' }),
});

type FormValues = z.infer<typeof Schema>;

const CreateUsernameModal = ({ open, onClose }: Props) => {
  const { candidateProfileData } = useOnboardingDialogContext();
  const queryClient = useQueryClient();

  const { mutate: updateUsername, isPending: isSubmitting } =
    useUpdatedCandidateUserName({
      onSuccess: (data: APISuccessResponse) => {
        queryClient.invalidateQueries({ queryKey: ['candidateProfile'] });
        successAlert({
          message: data?.message,
        });
        onClose();
      },
      onError: (error: ErrorResponse) => {
        errorAlert({ message: decodeAxiosError(error) });
      },
      onMutate: () => { },
      onSettled: () => { },
    });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: {
      username: candidateProfileData?.username,
    },
  });

  const isSameUsername = candidateProfileData?.username === watch('username');

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    updateUsername({
      username: data.username,
    });
  };

  const checkDisabled = () => {
    return isSubmitting || isSameUsername;
  };

  return (
    <CustomDialog open={open} onClose={onClose} title="Create Username">
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <Typography className={styles.label}>
            Please enter your username
          </Typography>
          <FieldErrorMessage name="username" errors={errors}>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  value={value}
                  onChange={onChange}
                  type="text"
                  placeholder="Enter your username"
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
            label="Update"
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

export default CreateUsernameModal;
