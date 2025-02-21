import React, { ChangeEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { SUCCESS_STATUS_CODE } from '@/utils/responseStatus';
import { ErrorData } from '@/utils/shared/axiosError';
import { useScanQRCode } from '@/hooks/shared';
import {
  APISuccessResponse,
  ErrorResponse,
  ScanParams,
  ScanResponse,
} from '@/@types/shared/type';
import { CustomButton } from '../Button/Button';
import CustomDialog from '../dialog/CustomDialog';
import FieldErrorMessage from '../fieldErrorMessage/fieldErrorMessage';
import { CustomInput } from '../Input/Input';
import { errorAlert } from '../toastAlert';
import styles from './styles.module.scss';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  params: ScanParams;
  setOpenDeactivatedScannerModal: (value: boolean) => void;
  setOpenConfirmModal: (value: boolean) => void;
  onExit: VoidFunction;
  setScanResponse: (value: ScanResponse) => void;
};

const AccountIdSchema = z.object({
  attendeeAccountId: z
    .string()
    .min(1, { message: 'Pass code is required to access this page' }),
});

type AccountIdForm = z.infer<typeof AccountIdSchema>;

const AccountIdModal = ({
  onClose,
  open,
  params,
  setOpenDeactivatedScannerModal,
  setOpenConfirmModal,
  onExit,
  setScanResponse,
}: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AccountIdForm>({
    resolver: zodResolver(AccountIdSchema),
    defaultValues: {
      attendeeAccountId: 'vau-',
    },
  });

  const { mutate: scanQRCode, isPending: isSubmitting } = useScanQRCode({
    onSuccess: (data: APISuccessResponse) => {
      setScanResponse(data?.data as ScanResponse);
      setOpenConfirmModal(true);
      reset();
      onClose();
    },
    onError: (error: ErrorResponse) => {
      if (error && error.response && error.response?.status === 401) {
        onExit();
      }
      if (error && error.response && error.response.data) {
        const errorData = error.response.data as ErrorData;
        if (errorData.errCode === SUCCESS_STATUS_CODE.SCANNER_NOT_ACTIVATED) {
          setOpenDeactivatedScannerModal(true);
          setOpenConfirmModal(false);
        } else {
          errorAlert({ message: errorData?.message });
        }
      }
    },
  });

  const onSubmit: SubmitHandler<AccountIdForm> = (data) => {
    scanQRCode({
      attendeeAccountId: data?.attendeeAccountId,
      employerId: params?.employerId,
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
  ) => {
    if (!e.target.value.startsWith('vau-')) {
      e.target.value = 'vau-';
    }
    onChange(e);
  };

  return (
    <CustomDialog onClose={onClose} open={open} title="Check In">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <Typography className={styles.label}>Please enter User ID</Typography>
        <Stack gap={2}>
          <FieldErrorMessage name="attendeeAccountId" errors={errors}>
            <Controller
              control={control}
              name="attendeeAccountId"
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(e, onChange)}
                  placeholder=""
                />
              )}
            />
          </FieldErrorMessage>
          <CustomButton
            label="Submit"
            type="submit"
            className={styles.submitBtn}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          />
        </Stack>
      </form>
    </CustomDialog>
  );
};

export default AccountIdModal;
