import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { SUCCESS_STATUS_CODE } from '@/utils/responseStatus';
import { COOKIES_KEY } from '@/utils/setCookies';
import { ErrorData } from '@/utils/shared/axiosError';
import { useAuthenticateScan } from '@/hooks/shared';
import {
  APISuccessResponse,
  ErrorResponse,
  ScanParams,
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
  setOpenCamera: (value: boolean) => void;
  setOpenDeactivatedScannerModal: (value: boolean) => void;
};

const PassCodeSchema = z.object({
  passCode: z
    .string()
    .min(1, { message: 'Pass code is required to access this page' }),
});

type PassCodeForm = z.infer<typeof PassCodeSchema>;

const PassCodeModal = ({
  onClose,
  open,
  params,
  setOpenCamera,
  setOpenDeactivatedScannerModal,
}: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PassCodeForm>({
    resolver: zodResolver(PassCodeSchema),
    defaultValues: {
      passCode: '',
    },
  });

  const { mutate: authenticateScan, isPending: isSubmitting } =
    useAuthenticateScan({
      onSuccess: (data: APISuccessResponse) => {
        const { access_token } = data.data as { access_token: string };
        Cookies.set(COOKIES_KEY.SCAN_AUTH_TOKEN, access_token);
        onClose();
        setOpenCamera(true);
        reset();
      },
      onError: (error: ErrorResponse) => {
        if (error && error.response && error.response.data) {
          const errorData = error.response.data as ErrorData;
          if (errorData.errCode === SUCCESS_STATUS_CODE.SCANNER_NOT_ACTIVATED) {
            onClose();
            setOpenDeactivatedScannerModal(true);
          } else {
            errorAlert({ message: errorData?.message });
          }
        }
      },
    });

  const onSubmit: SubmitHandler<PassCodeForm> = (data) => {
    authenticateScan({
      ...params,
      passCode: data.passCode,
    });
  };

  return (
    <CustomDialog onClose={onClose} open={open} title="Get Access" noClose>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <Typography className={styles.label}>Please enter Pass Code</Typography>
        <Stack gap={2}>
          <FieldErrorMessage name="passCode" errors={errors}>
            <Controller
              control={control}
              name="passCode"
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  type="text"
                  value={value}
                  onChange={onChange}
                  placeholder="e.g 1234"
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

export default PassCodeModal;
