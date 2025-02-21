import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, Input, Modal, SxProps, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useVerificationContext } from '@/contexts/verification';
import ButtonSpacing from '../../Button/ButtonSpacing';
import ArrowBack from '../../icons/arrowBackBlack';
import Cancel from '../../icons/cancel';
import Edit from '../../icons/edit';
import HStack from '../../stacks/HStack';
import VStack from '../../stacks/VStack';
import styles from '../verification.module.scss';

const schema = yup.object({
  fullName: yup
    .string()
    .required()
    .matches(/^[a-z ,.'-]+$/i),
  studentId: yup.number().integer().required(),
  program: yup
    .string()
    .required()
    .matches(/^[a-z ,.'-]+$/i),
  qualification: yup
    .string()
    .required()
    .matches(/^[a-z ,.'-]+$/i),
  gpa: yup.number().required(),
  fullNamePresent: yup.boolean().oneOf([true], 'Field must be checked'),
  studentIdPresent: yup.boolean().oneOf([true], 'Field must be checked'),
  programPresent: yup.boolean().oneOf([true], 'Field must be checked'),
  qualificationPresent: yup.boolean().oneOf([true], 'Field must be checked'),
  gpaPresent: yup.boolean().oneOf([true], 'Field must be checked'),
});

type FormData = yup.InferType<typeof schema>;

const VerifyDetails = () => {
  const { verifyDetailsOpen, setVerifyDetailsOpen, verifyDetailsUserInfo } =
    useVerificationContext();
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
      studentIdPresent: false,
      programPresent: false,
      qualificationPresent: false,
      gpaPresent: false,
    },
  });

  useEffect(() => {
    setValue('fullName', verifyDetailsUserInfo?.fullName);
    setValue('studentId', verifyDetailsUserInfo?.studentID);
    setValue('program', verifyDetailsUserInfo?.program);
    setValue('qualification', verifyDetailsUserInfo?.qualification);
    setValue('gpa', verifyDetailsUserInfo?.GPA);
  }, [verifyDetailsUserInfo, setValue]);

  const onSubmit = (data: FormData) => console.log(data);

  const allCheckboxesChecked = watch([
    'fullNamePresent',
    'gpaPresent',
    'programPresent',
    'qualificationPresent',
    'studentIdPresent',
  ]).every((elem) => elem === true);

  const handleCheck = (checked: boolean) => {
    if (checked) {
      setValue('fullNamePresent', true);
      setValue('studentIdPresent', true);
      setValue('programPresent', true);
      setValue('qualificationPresent', true);
      setValue('gpaPresent', true);
    } else {
      setValue('fullNamePresent', false);
      setValue('studentIdPresent', false);
      setValue('programPresent', false);
      setValue('qualificationPresent', false);
      setValue('gpaPresent', false);
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
            <span>Verify {verifyDetailsUserInfo?.fullName}</span>
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
                  Student ID
                </Typography>
                <HStack className={styles.verifyDetailsRightContainer}>
                  <VStack>
                    <Input
                      {...register('studentId')}
                      className={styles.verifyDetailsInput}
                      disabled={!isEdit}
                      sx={{ width: { xs: '250px', sm: '300px' } }}
                    />

                    <span className={styles.verifyDetailsErrorLabel}>
                      {errors?.studentId &&
                        (errors.studentId?.type === 'required'
                          ? 'Student ID field is required'
                          : 'Student ID may only contain integers')}
                    </span>
                  </VStack>

                  <Controller
                    name="studentIdPresent"
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
                  Program
                </Typography>
                <HStack className={styles.verifyDetailsRightContainer}>
                  <VStack>
                    <Input
                      {...register('program')}
                      className={styles.verifyDetailsInput}
                      disabled={!isEdit}
                      sx={{ width: { xs: '250px', sm: '300px' } }}
                    />
                    <span className={styles.verifyDetailsErrorLabel}>
                      {errors?.program &&
                        (errors.program?.type === 'required'
                          ? 'Program field is required'
                          : 'Program field may only contain letters')}
                    </span>
                  </VStack>

                  <Controller
                    name="programPresent"
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
                  Qualification
                </Typography>
                <HStack className={styles.verifyDetailsRightContainer}>
                  <VStack>
                    <Input
                      {...register('qualification')}
                      className={styles.verifyDetailsInput}
                      disabled={!isEdit}
                      sx={{ width: { xs: '250px', sm: '300px' } }}
                    />
                    <span className={styles.verifyDetailsErrorLabel}>
                      {errors?.qualification &&
                        (errors.qualification?.type === 'required'
                          ? 'Qualification field is required'
                          : 'Qualification field may only contain letters')}
                    </span>
                  </VStack>

                  <Controller
                    name="qualificationPresent"
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
                  Overall GPA
                </Typography>
                <HStack className={styles.verifyDetailsRightContainer}>
                  <VStack>
                    <Input
                      {...register('gpa')}
                      className={styles.verifyDetailsInput}
                      disabled={!isEdit}
                      sx={{ width: { xs: '250px', sm: '300px' } }}
                    />

                    <span className={styles.verifyDetailsErrorLabel}>
                      {errors?.gpa &&
                        (errors.gpa?.type === 'required'
                          ? 'Qualification field is required'
                          : 'Qualification field may only contain numbers')}
                    </span>
                  </VStack>

                  <Controller
                    name="gpaPresent"
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

export default VerifyDetails;
