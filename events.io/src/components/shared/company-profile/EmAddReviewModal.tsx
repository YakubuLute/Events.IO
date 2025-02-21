import React from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { StarRounded } from '@mui/icons-material';
import { Checkbox, Rating, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { decodeAxiosError } from '@/utils/shared/axiosError';
import {
  CustomButton,
  CustomDialog,
  SelectAsyncPaginate,
} from '@/components/shared';
import FieldErrorMessage from '@/components/shared/fieldErrorMessage/fieldErrorMessage';
import { errorAlert, successAlert } from '@/components/shared/toastAlert';
import { useAddCandidateEmployerReview } from '@/hooks/candidate';
import {
  TEmAddReviewPayload,
  TEmployerReviewPayload,
} from '@/@types/employer/employer';
import { APISuccessResponse, ErrorResponse } from '@/@types/shared/type';
import { loadCandidateEmploymentStatusOptions } from '@/utils';
import styles from './styles.module.scss';

type Props = {
  open: boolean;
  onClose: () => void;
  employerId: string;
  filterDTO: TEmployerReviewPayload;
};

const Schema = z.object({
  rating: z.number({
    required_error: 'This field is required',
  }),
  employmentStatus: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { required_error: 'This field is required' }
  ),
  headline: z
    .string({
      required_error: 'This field is required',
    })
    .trim()
    .max(60, { message: 'Must be 60 characters or less' })
    .min(1, { message: 'This field is required' }),
  pros: z
    .string({
      required_error: 'This field is required',
    })
    .trim()
    .max(1000, { message: 'Must be 1000 characters or less' })
    .min(1, { message: 'This field is required' }),
  cons: z
    .string({
      required_error: 'This field is required',
    })
    .trim()
    .max(1000, { message: 'Must be 1000 characters or less' })
    .min(1, { message: 'This field is required' }),
  advice: z.string().trim().optional(),
});

type FormValues = z.infer<typeof Schema>;

const EmAddReviewModal = ({ employerId, onClose, open, filterDTO }: Props) => {
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: {
      advice: undefined,
      cons: '',
      employmentStatus: undefined,
      headline: '',
      pros: '',
      rating: 0,
    },
  });

  const { mutate: addEmployerReview, isPending: isSubmitting } =
    useAddCandidateEmployerReview({
      onSuccess: (data: APISuccessResponse) => {
        queryClient.invalidateQueries({
          queryKey: ['getCandidateEmployerReviews', filterDTO],
        });
        reset();
        onClose();
        successAlert({ message: data?.message });
      },
      onError: (error: ErrorResponse) => {
        errorAlert({ message: decodeAxiosError(error) });
      },
    });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const payload: TEmAddReviewPayload = {
      advice: data?.advice || '',
      cons: data?.cons,
      pros: data?.pros,
      employmentStatus: data?.employmentStatus?.value,
      headline: data?.headline,
      rating: data?.rating,
      employerId,
    };
    addEmployerReview(payload);
  };

  return (
    <CustomDialog title="Add Review" onClose={onClose} open={open}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.formContainer}
        autoComplete="off"
      >
        <div className={styles.formGroup}>
          <Typography className={styles.label} component="label">
            Rating*
          </Typography>
          <FieldErrorMessage name="rating" errors={errors}>
            <Controller
              control={control}
              name="rating"
              render={({ field: { onChange, value } }) => (
                <Rating
                  value={value}
                  onChange={(_, newValue: number | null) => {
                    onChange(newValue);
                  }}
                  emptyIcon={<StarRounded className={styles.ratingStarEmpty} />}
                  icon={<StarRounded className={styles.ratingStarFilled} />}
                  precision={0.5}
                />
              )}
            />
          </FieldErrorMessage>
        </div>
        <div className={styles.formGroup}>
          <Typography className={styles.label}>Employment Status*</Typography>
          <FieldErrorMessage name="employmentStatus" errors={errors}>
            <Controller
              control={control}
              name="employmentStatus"
              render={({ field: { onChange, value } }) => (
                <SelectAsyncPaginate
                  loadOptions={loadCandidateEmploymentStatusOptions as any}
                  onChange={onChange}
                  value={value}
                  placeholder="Select Employment Status"
                  styles={{
                    menuPortal: (base) => ({
                      ...base,
                      zIndex: 9999,
                      textTransform: 'capitalize',
                    }),
                  }}
                  menuPortalTarget={document.body}
                />
              )}
            />
          </FieldErrorMessage>
        </div>
        <div className={styles.formGroup}>
          <Typography className={styles.label}>Review Headline*</Typography>
          <FieldErrorMessage name="headline" errors={errors}>
            <Controller
              control={control}
              name="headline"
              render={({ field: { onChange, value } }) => (
                <input
                  type="text"
                  placeholder="Enter Review Headline"
                  value={value}
                  onChange={onChange}
                  className={styles.inputText}
                />
              )}
            />
          </FieldErrorMessage>
        </div>
        <div className={styles.formGroup}>
          <Typography className={styles.label}>Pros*</Typography>
          <FieldErrorMessage name="pros" errors={errors}>
            <Controller
              control={control}
              name="pros"
              render={({ field: { onChange, value } }) => (
                <textarea
                  value={value}
                  onChange={onChange}
                  placeholder="Input text"
                  className={styles.inputText}
                  rows={5}
                />
              )}
            />
          </FieldErrorMessage>
        </div>
        <div className={styles.formGroup}>
          <Typography className={styles.label}>Cons*</Typography>
          <FieldErrorMessage name="cons" errors={errors}>
            <Controller
              control={control}
              name="cons"
              render={({ field: { onChange, value } }) => (
                <textarea
                  value={value}
                  onChange={onChange}
                  placeholder="Input text"
                  className={styles.inputText}
                  rows={5}
                />
              )}
            />
          </FieldErrorMessage>
        </div>
        <div className={styles.formGroup}>
          <Typography className={styles.label}>
            Advice for management?
          </Typography>
          <FieldErrorMessage name="advice" errors={errors}>
            <Controller
              control={control}
              name="advice"
              render={({ field: { onChange, value } }) => (
                <textarea
                  value={value}
                  onChange={onChange}
                  placeholder="Input text"
                  className={styles.inputText}
                  rows={5}
                />
              )}
            />
          </FieldErrorMessage>
        </div>
        <CustomButton
          type="submit"
          label="Submit Review"
          fullWidth
          className={styles.btn}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        />
      </form>
    </CustomDialog>
  );
};

export default EmAddReviewModal;
