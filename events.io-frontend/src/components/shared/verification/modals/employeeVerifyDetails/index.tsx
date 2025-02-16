import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, Input, Modal, SxProps, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useUpdateEmployerVerification } from '@/hooks/employer/useEmployer';
// import { useRouter } from 'next/navigation';

import { useVerificationContext } from '@/contexts/verification';
import ButtonSpacing from '../../../Button/ButtonSpacing';
import ArrowBack from '../../../icons/arrowBackBlack';
import Cancel from '../../../icons/cancel';
import Edit from '../../../icons/edit';
import HStack from '../../../stacks/HStack';
import VStack from '../../../stacks/VStack';
import styles from '../../verification.module.scss';
import { schema } from './verification';

type FormData = yup.InferType<typeof schema>;

const EmployeeVerifyDetails = () => {
  const {
    verifyDetailsOpen,
    setVerifyDetailsOpen,
    verifyDetailsEmployeeInfo,
    setVerificationSuccessOpen,
    // successData,
    setSuccessData,
  } = useVerificationContext();
  const verifyEmployee = useUpdateEmployerVerification();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullNamePresent: false,
      employeeIdPresent: false,
      jobTitlePresent: false,
      startDatePresent: false,
      endDatePresent: false,
      descriptionPresent: false,
    },
  });

  useEffect(() => {
    setValue('fullName', verifyDetailsEmployeeInfo?.fullName || '');
    setValue('startDate', verifyDetailsEmployeeInfo?.startDate || '');
    setValue('endDate', verifyDetailsEmployeeInfo?.endDate || '');
    setValue('jobTitle', verifyDetailsEmployeeInfo?.jobTitle || '');
    setValue('description', verifyDetailsEmployeeInfo?.description || '');
  }, [verifyDetailsEmployeeInfo, setValue]);

  const onSubmit = async (data: FormData) => {
    const submitData = {
      verifyId: verifyDetailsEmployeeInfo?._id,
      fullName: data?.fullName,
      employeeId: data?.employeeId,
      startDate: dayjs(data?.startDate).format('YYYY-MM-DD'),
      endDate: dayjs(data?.endDate).format('YYYY-MM-DD'),
      jobTitle: data?.jobTitle,
      description: data?.description,
    };
    await verifyEmployee.mutateAsync(submitData);

    setVerifyDetailsOpen(false);
    setVerificationSuccessOpen(true);
    setSuccessData({
      heading: 'credentials have been verified!',
      message: `${verifyDetailsEmployeeInfo?.fullName}'s credentials have been successfully verified and securely recorded on the blockchain.`,
      buttons: true,
    });
  };

  const allCheckboxesChecked = watch([
    'fullNamePresent',
    'employeeIdPresent',
    'startDatePresent',
    'endDatePresent',
    'jobTitlePresent',
    'descriptionPresent',
  ]).every((elem) => elem === true);

  const handleCheck = (checked: boolean) => {
    if (checked) {
      setValue('fullNamePresent', true);
      setValue('jobTitlePresent', true);
      setValue('startDatePresent', true);
      setValue('endDatePresent', true);
      setValue('descriptionPresent', true);
    } else {
      setValue('fullNamePresent', false);
      setValue('startDatePresent', false);
      setValue('endDatePresent', false);
      setValue('jobTitlePresent', false);
      setValue('descriptionPresent', false);
    }
  };

  const [isEdit, setIsEdit] = useState(false);

  const verifyDetailsRowStyles: SxProps = {
    flexDirection: { xs: 'column', sm: 'row' },
    gap: { xs: '6px', sm: '30px' },
    alignItems: { xs: 'start', sm: 'center' },
  };

  const verifyDetailsLabel: SxProps = {
    fontSize: { xs: '14px', lg: '18px' },
    color: { xs: '#4F4B5C', lg: 'black' },
  };

  const MiddleData = ({
    sx,
    className,
  }: {
    sx?: SxProps;
    className?: string;
  }) => {
    return (
      <VStack
        sx={sx}
        className={[styles.verifyDetailsContainer, className].join(' ')}
      >
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
              setVerifyDetailsOpen(false);
            }}
            sx={{ display: { xs: 'none', lg: 'flex' } }}
          >
            <Cancel />
          </ButtonSpacing>
          <ButtonSpacing
            onClick={(e) => {
              e.preventDefault();
              setVerifyDetailsOpen(false);
            }}
            className={styles.verifyDetailsMobileHeader}
            sx={{ display: { xs: 'flex', lg: 'none' } }}
          >
            <ArrowBack />
            <span>Verify {verifyDetailsEmployeeInfo?.fullName}</span>
          </ButtonSpacing>
        </HStack>

        <VStack sx={{ padding: { xs: '0px 10px', lg: '0px 60px 0px 60px' } }}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.verifyDetailsInnerContainer}
          >
            <HStack
              className={styles.verifyDetailsHeader}
              sx={{ paddingBottom: { xs: '8px', lg: '32px' } }}
            >
              <Typography
                className={styles.verifyDetailsTitle}
                sx={{ fontSize: { xs: '16px', lg: '32px' } }}
              >
                Verify Details
              </Typography>
              {isEdit ? (
                <ButtonSpacing
                  className={styles.verifyDetailsSaveButton}
                  sx={{
                    width: { xs: '100px', lg: '150px' },
                    fontSize: { xs: '12px', lg: '16px' },
                    padding: { xs: '8px 10px', lg: '12px 16px' },
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEdit(false);
                  }}
                >
                  Save
                </ButtonSpacing>
              ) : (
                <ButtonSpacing
                  className={styles.verifyDetailsEditButton}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEdit(true);
                  }}
                  sx={{
                    width: { xs: '100px', lg: '150px' },
                    fontSize: { xs: '12px', lg: '16px' },
                    gap: { xs: '6px', lg: '10px' },
                    padding: { xs: '8px 10px', lg: '12px 16px' },
                  }}
                >
                  <Edit
                    sx={{
                      width: { xs: '14px', lg: '20px' },
                      height: { xs: '14px', lg: '20px' },
                    }}
                  />
                  <span>Edit</span>
                </ButtonSpacing>
              )}
            </HStack>
            <VStack
              sx={{
                gap: { xs: '6px', lg: '20px' },
                backgroundColor: { xs: 'white', lg: 'unset' },
                padding: { xs: '22px', lg: '0px' },
                borderRadius: { xs: '16px', lg: '0px' },
                boxShadow: {
                  xs: '0px 2px 4px 0px rgba(0, 0, 0, 0.28)',
                  lg: 'unset',
                },
              }}
            >
              <HStack sx={verifyDetailsRowStyles}>
                <Typography
                  className={styles.verifyDetailsLabel}
                  sx={verifyDetailsLabel}
                >
                  Full Name
                </Typography>
                <HStack className={styles.verifyDetailsRightContainer}>
                  <VStack>
                    <Input
                      {...register('fullName')}
                      className={styles.verifyDetailsInput}
                      aria-invalid={errors?.fullName ? 'true' : 'false'}
                      disabled={!isEdit}
                      onChange={(e) => setValue('fullName', e.target.value)}
                      sx={{ width: { xs: '250px', sm: '300px' } }}
                    />

                    <span className={styles.verifyDetailsErrorLabel}>
                      {errors?.fullName &&
                        (errors.fullName?.type === 'required'
                          ? 'Full Name field is required'
                          : 'Full Name may only contain letters')}
                    </span>
                  </VStack>

                  <Controller
                    name="fullNamePresent"
                    control={control}
                    render={({ field: { value, ref, ...field } }) => (
                      <Checkbox
                        {...field}
                        inputRef={ref}
                        checked={!!value}
                        sx={{
                          color: '#0C27BE',
                          transform: 'scale(1.5)',
                        }}
                      />
                    )}
                  />
                </HStack>
              </HStack>

              <HStack sx={verifyDetailsRowStyles}>
                <Typography
                  className={styles.verifyDetailsLabel}
                  sx={verifyDetailsLabel}
                >
                  Role
                </Typography>
                <HStack className={styles.verifyDetailsRightContainer}>
                  <VStack>
                    <Input
                      {...register('jobTitle')}
                      className={styles.verifyDetailsInput}
                      disabled={!isEdit}
                      onChange={(e) => setValue('jobTitle', e.target.value)}
                      sx={{ width: { xs: '250px', sm: '300px' } }}
                    />
                    <span className={styles.verifyDetailsErrorLabel}>
                      {errors?.jobTitle &&
                        (errors.jobTitle?.type === 'required'
                          ? 'Role field is required'
                          : 'Role field may only contain letters')}
                    </span>
                  </VStack>

                  <Controller
                    name="jobTitlePresent"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, ref, ...field } }) => (
                      <Checkbox
                        {...field}
                        inputRef={ref}
                        checked={!!value}
                        sx={{
                          color: '#0C27BE',
                          transform: 'scale(1.5)',
                        }}
                      />
                    )}
                  />
                </HStack>
              </HStack>

              <HStack sx={verifyDetailsRowStyles}>
                <Typography
                  className={styles.verifyDetailsLabel}
                  sx={verifyDetailsLabel}
                >
                  Start Date
                </Typography>
                <HStack className={styles.verifyDetailsRightContainer}>
                  <VStack>
                    <Input
                      {...register('startDate')}
                      type="date"
                      className={styles.verifyDetailsInput}
                      disabled={!isEdit}
                      onChange={(e) => setValue('startDate', e.target.value)}
                      sx={{ width: { xs: '250px', sm: '300px' } }}
                    />
                    <span className={styles.verifyDetailsErrorLabel}>
                      {errors?.startDate &&
                        (errors.startDate?.type === 'required'
                          ? 'Qualification field is required'
                          : 'Qualification field may only contain letters')}
                    </span>
                  </VStack>

                  <Controller
                    name="startDatePresent"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, ref, ...field } }) => (
                      <Checkbox
                        {...field}
                        inputRef={ref}
                        checked={!!value}
                        sx={{
                          color: '#0C27BE',
                          transform: 'scale(1.5)',
                        }}
                      />
                    )}
                  />
                </HStack>
              </HStack>

              <HStack sx={verifyDetailsRowStyles}>
                <Typography
                  className={styles.verifyDetailsLabel}
                  sx={verifyDetailsLabel}
                >
                  End Date
                </Typography>
                <HStack className={styles.verifyDetailsRightContainer}>
                  <VStack>
                    <Input
                      {...register('endDate')}
                      type="date"
                      className={styles.verifyDetailsInput}
                      disabled={!isEdit}
                      onChange={(e) => setValue('endDate', e.target.value)}
                      sx={{ width: { xs: '250px', sm: '300px' } }}
                    />
                    <span className={styles.verifyDetailsErrorLabel}>
                      {errors?.endDate &&
                        (errors.endDate?.type === 'required'
                          ? 'End Date field is required'
                          : 'End Date field may only contain date')}
                    </span>
                  </VStack>

                  <Controller
                    name="endDatePresent"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, ref, ...field } }) => (
                      <Checkbox
                        {...field}
                        inputRef={ref}
                        checked={!!value}
                        sx={{
                          color: '#0C27BE',
                          transform: 'scale(1.5)',
                        }}
                      />
                    )}
                  />
                </HStack>
              </HStack>

              <HStack sx={verifyDetailsRowStyles}>
                <Typography
                  className={styles.verifyDetailsLabel}
                  sx={verifyDetailsLabel}
                >
                  Description
                </Typography>
                <HStack className={styles.verifyDetailsRightContainer}>
                  <VStack>
                    <Input
                      {...register('description')}
                      className={styles.verifyDetailsInput}
                      disabled={!isEdit}
                      onChange={(e) => setValue('description', e.target.value)}
                      sx={{ width: { xs: '250px', sm: '300px' } }}
                      multiline
                      rows={6}
                    />

                    <span className={styles.verifyDetailsErrorLabel}>
                      {errors?.description &&
                        (errors.description?.type === 'required'
                          ? 'Description field is required'
                          : 'Description field may only contain string')}
                    </span>
                  </VStack>

                  <Controller
                    name="descriptionPresent"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, ref, ...field } }) => (
                      <Checkbox
                        {...field}
                        inputRef={ref}
                        checked={!!value}
                        sx={{
                          color: '#0C27BE',
                          transform: 'scale(1.5)',
                        }}
                      />
                    )}
                  />
                </HStack>
              </HStack>
            </VStack>
            <VStack className={styles.verifyDetailsLabelInfoContainer}>
              <VStack className={styles.verifyDetailsLabelInfoInnerContainer}>
                <Typography
                  className={styles.verifyDetailsLabelInfoLabel1}
                  sx={{ fontSize: { xs: '', lg: '14px' } }}
                >
                  Please ensure that you thoroughly review all the information
                  provided before submitting, as once the submission is made, it
                  will be permanently recorded on the blockchain and cannot be
                  modified. Accuracy is crucial to maintain the integrity of the
                  data.
                </Typography>

                <HStack sx={{ padding: '0px 0px 0px 16px' }}>
                  <Checkbox
                    onChange={(e) => handleCheck(e.currentTarget.checked)}
                    checked={allCheckboxesChecked}
                    value={allCheckboxesChecked}
                    sx={{
                      color: '#0BAA60',
                      transform: 'scale(1.5)',
                    }}
                  />
                  <Typography
                    className={styles.verifyDetailsLabelInfo2}
                    sx={{ color: allCheckboxesChecked ? '#0BAA60' : 'black' }}
                  >
                    I confirm all the details are accurate
                  </Typography>
                </HStack>
                <span>
                  <ButtonSpacing
                    type="submit"
                    className={styles.verifyDetailsSubmitButton}
                    sx={{
                      backgroundColor:
                        allCheckboxesChecked && !isEdit ? '#0C27BE' : '#e2e2e4',
                      color:
                        allCheckboxesChecked && !isEdit ? 'white' : '#b3b1b8',
                      position: { xs: 'fixed', lg: 'relative' },
                      width: { xs: '100%', lg: '300px' },
                      borderRadius: { xs: '0px', lg: '12px' },
                    }}
                    disabled={isEdit}
                  >
                    Submit Verification
                  </ButtonSpacing>
                </span>
              </VStack>
            </VStack>
          </form>
        </VStack>
      </VStack>
    );
  };

  return (
    <>
      <Modal
        open={verifyDetailsOpen}
        onClose={() => setVerifyDetailsOpen(false)}
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
          transform: verifyDetailsOpen ? 'translateY(0)' : 'translateY(100vh)',
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

export default EmployeeVerifyDetails;
