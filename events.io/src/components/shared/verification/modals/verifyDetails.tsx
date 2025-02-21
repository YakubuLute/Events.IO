// import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, Divider, Input, Modal, SxProps, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useQueryClient } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import CustomDatePicker from '@/components/shared/datePicker/customDatePicker';
import { errorAlert, successAlert } from '@/components/shared/toastAlert';
import { updateUniversityRequestDTO } from '@/hooks/university/dtos/req/university_updates.dto.req';
import { useUpdateUniversityRequest } from '@/hooks/university/useVerificationRequestsUpdates';
import { useUniversityContext } from '@/contexts/universityContext';
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
  studentId: yup.string().required(),
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
  durationPresent: yup.boolean().oneOf([true], 'Field must be checked'),
  studentIdPresent: yup.boolean().oneOf([true], 'Field must be checked'),
  programPresent: yup.boolean().oneOf([true], 'Field must be checked'),
  qualificationPresent: yup.boolean().oneOf([true], 'Field must be checked'),
  gpaPresent: yup.boolean().oneOf([true], 'Field must be checked'),
});

type FormData = yup.InferType<typeof schema>;

interface Props {
  handleSubmitVerification: (data: FormData) => void;
  isVerifying: boolean;
}

const VerifyDetails: FC<Props> = ({
  handleSubmitVerification,
  isVerifying,
}) => {
  const {
    verifyDetailsOpen,
    setVerifyDetailsOpen,
    verifyDetailsUserInfo,
    setVerificationSuccessOpen,
    setBlockChainLoading,
    setSuccessData,
  } = useVerificationContext();
  const { } = useUniversityContext();
  const { } = useUpdateUniversityRequest();
  // const router = useRouter()
  const { mutateAsync, isPending: isSaving } = useUpdateUniversityRequest();
  const [isEdit, setIsEdit] = useState(false);
  const [willEdit, setWillEdit] = useState(false);
  const queryClient = useQueryClient();

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
    setValue('startDate', verifyDetailsUserInfo?.startDate);
    setValue('endDate', verifyDetailsUserInfo?.endDate);

    setValue('studentId', verifyDetailsUserInfo?.studentID);
    setValue('program', verifyDetailsUserInfo?.credential);
    setValue('qualification', verifyDetailsUserInfo?.discipline);
    setValue('gpa', verifyDetailsUserInfo?.cgpa);
  }, [verifyDetailsUserInfo, setValue]);

  useEffect(() => {
    setBlockChainLoading(isSaving || isVerifying);
    if (isSaving || isVerifying) {
      setVerifyDetailsOpen(false);
    }
  }, [isSaving, isVerifying]);

  const handleSave = async (data: FormData) => {
    const submitData: updateUniversityRequestDTO = {
      verificationRequestId: verifyDetailsUserInfo._id,
      payload: {
        cgpa: data?.gpaPresent ? data?.gpa.toString() : null,
        fullName: data?.fullNamePresent ? data?.fullName : null,
        discipline: verifyDetailsUserInfo.discipline,
        studentId: data?.studentId,
        startDate: data?.startDate,
        endDate: data?.endDate,
      },
    };

    if (willEdit)
      await mutateAsync(submitData, {
        onSuccess: ({ data }) => {
          successAlert({
            message: 'values Updated successfully',
          });

          queryClient.invalidateQueries({ queryKey: ['verificationRequests'] });
          queryClient.invalidateQueries({
            queryKey: ['universityVerificationStatistics'],
          });
        },
        onError: (error) => {
          errorAlert({
            message: error?.response?.data?.message,
          });
        },
      });
  };

  const allCheckboxesChecked = watch([
    'fullNamePresent',
    'durationPresent',
    'gpaPresent',
    'programPresent',
    'qualificationPresent',
    'studentIdPresent',
  ]).every((elem) => elem === true);

  const handleCheck = (checked: boolean) => {
    if (checked) {
      setValue('fullNamePresent', true);
      setValue('durationPresent', true);
      setValue('studentIdPresent', true);
      setValue('programPresent', true);
      setValue('qualificationPresent', true);
      setValue('gpaPresent', true);
    } else {
      setValue('fullNamePresent', false);
      setValue('durationPresent', false);
      setValue('studentIdPresent', false);
      setValue('programPresent', false);
      setValue('qualificationPresent', false);
      setValue('gpaPresent', false);
    }
  };

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
            onSubmit={handleSubmit(handleSave)}
            className={styles.verifyDetailsInnerContainer}
          >
            <HStack
              className={styles.verifyDetailsHeader}
              sx={{ paddingBottom: { xs: '8px', lg: '32px' } }}
            >
              <Typography
                className={styles.verifyDetailsTitle}
                sx={{ fontSize: { xs: '16px', lg: '28px' } }}
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
                    setWillEdit(true);
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
                    width: { xs: '105px' },
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

                  <div className={styles.checkboxWrapper}>
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
                            borderRadius: "6px",
                          }}
                        />
                      )}
                    />
                    <span>
                      Approve
                    </span>
                  </div>
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
                      onChange={(e) => setValue('studentId', e.target.value)}
                      sx={{ width: { xs: '250px', sm: '300px' } }}
                    />

                    <span className={styles.verifyDetailsErrorLabel}>
                      {errors?.studentId &&
                        (errors.studentId?.type === 'required'
                          ? 'Student ID field is required'
                          : 'Student ID may only contain integers')}
                    </span>
                  </VStack>

                  <div className={styles.checkboxWrapper}>
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
                            borderRadius: "6px",
                          }}
                        />
                      )}
                    />
                    <span>
                      Approve
                    </span>
                  </div>
                </HStack>
              </HStack>

              <HStack sx={verifyDetailsRowStyles}>
                <Typography
                  className={styles.verifyDetailsLabel}
                  sx={verifyDetailsLabel}
                >
                  Qualifications
                </Typography>
                <HStack className={styles.verifyDetailsRightContainer}>
                  <VStack>
                    <Input
                      {...register('program')}
                      className={styles.verifyDetailsInput}
                      disabled={!isEdit}
                      onChange={(e) => setValue('program', e.target.value)}
                      sx={{ width: { xs: '250px', sm: '300px' } }}
                    />
                    <span className={styles.verifyDetailsErrorLabel}>
                      {errors?.program &&
                        (errors.program?.type === 'required'
                          ? 'Program field is required'
                          : 'Program field may only contain letters')}
                    </span>
                  </VStack>

                  <div className={styles.checkboxWrapper}>
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
                            borderRadius: "6px",
                          }}
                        />
                      )}
                    />
                    <span>
                      Approve
                    </span>
                  </div>
                </HStack>
              </HStack>

              <HStack sx={verifyDetailsRowStyles}>
                <Typography
                  className={styles.verifyDetailsLabel}
                  sx={verifyDetailsLabel}
                >
                  Descipline
                </Typography>
                <HStack className={styles.verifyDetailsRightContainer}>
                  <VStack>
                    <Input
                      {...register('qualification')}
                      className={styles.verifyDetailsInput}
                      disabled={!isEdit}
                      onChange={(e) =>
                        setValue('qualification', e.target.value)
                      }
                      sx={{ width: { xs: '250px', sm: '300px' } }}
                    />
                    <span className={styles.verifyDetailsErrorLabel}>
                      {errors?.qualification &&
                        (errors.qualification?.type === 'required'
                          ? 'Qualification field is required'
                          : 'Qualification field may only contain letters')}
                    </span>
                  </VStack>

                  <div className={styles.checkboxWrapper}>
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
                            borderRadius: "6px",
                          }}
                        />
                      )}
                    />
                    <span>
                      Approve
                    </span>
                  </div>
                </HStack>
              </HStack>
              <HStack sx={verifyDetailsRowStyles}>
                <Typography
                  className={styles.verifyDetailsLabel}
                  sx={verifyDetailsLabel}
                >
                  Duration
                </Typography>
                <HStack className={styles.verifyDetailsRightContainer}>
                  <VStack>
                    <HStack
                      className={styles.filterDateRow}
                      sx={{ width: { xs: '250px', sm: '300px' } }}
                    >
                      <VStack className={styles.filterDateItem}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            disabled={!isEdit}
                            {...register('startDate')}
                            label="From"
                            name="startDate"
                            defaultValue={dayjs(
                              verifyDetailsUserInfo?.startDate
                            )}
                            slotProps={{
                              textField: {
                                size: 'small',
                              },
                            }}
                            onChange={(newValue) =>
                              setValue(
                                'startDate',
                                newValue.format('YYYY-DD-MM')
                              )
                            }
                          />
                        </LocalizationProvider>
                      </VStack>

                      <VStack className={styles.filterDateItem}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            disabled={!isEdit}
                            {...register('endDate')}
                            label="From"
                            name="endDate"
                            defaultValue={dayjs(verifyDetailsUserInfo?.endDate)}
                            slotProps={{
                              textField: {
                                size: 'small',
                              },
                            }}
                            onChange={(newValue) =>
                              setValue('endDate', newValue.format('YYYY-DD-MM'))
                            }
                          />
                        </LocalizationProvider>
                      </VStack>
                    </HStack>

                    <span className={styles.verifyDetailsErrorLabel}>
                      {errors?.endDate &&
                        errors?.startDate &&
                        (errors.endDate?.type === 'required' &&
                          errors.startDate?.type === 'required'
                          ? 'Duration field is required'
                          : 'Duration field may only contain letters')}
                    </span>
                  </VStack>

                  <div className={styles.checkboxWrapper}>
                    <Controller
                      name="durationPresent"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, ref, ...field } }) => (
                        <Checkbox
                          {...field}
                          inputRef={ref}
                          checked={!!value}
                          sx={{
                            color: '#0C27BE',
                            borderRadius: "6px",
                          }}
                        />
                      )}
                    />
                    <span>
                      Approve
                    </span>
                  </div>
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
                      onChange={(e) => setValue('gpa', e.target.value)}
                      sx={{ width: { xs: '250px', sm: '300px' } }}
                    />

                    <span className={styles.verifyDetailsErrorLabel}>
                      {errors?.gpa &&
                        (errors.gpa?.type === 'required'
                          ? 'Qualification field is required'
                          : 'Qualification field may only contain numbers')}
                    </span>
                  </VStack>

                  <div className={styles.checkboxWrapper}>
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
                            borderRadius: "6px",
                          }}
                        />
                      )}
                    />
                    <span>
                      Approve
                    </span>
                  </div>
                </HStack>
              </HStack>
            </VStack>
            <Divider sx={{
              margin: "24px 0"
            }} />
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
                      borderRadius: "6px",
                    }}
                  />
                  <Typography
                    className={styles.verifyDetailsLabelInfo2}
                    sx={{ color: allCheckboxesChecked ? '#0BAA60' : 'black' }}
                  >
                    I confirm all the details are accurate
                  </Typography>
                </HStack>
                <Divider sx={{
                  margin: "24px 0"
                }} />
                <HStack>
                  <ButtonSpacing
                    type="button"
                    className={styles.verifyDetailsSubmitButton}
                    sx={{
                      backgroundColor: "#FFC7C7",
                      color: "#CF2A2A",
                      position: { xs: 'fixed', lg: 'relative' },
                      width: { xs: '100%', lg: '300px' },
                      borderRadius: { xs: '0px', lg: '12px' },
                      marginRight: "16px"
                    }}
                    onClick={() => setVerifyDetailsOpen(false)}
                  >
                    Cancel
                  </ButtonSpacing>
                  <ButtonSpacing
                    type="button"
                    onClick={handleSubmitVerification}
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
                </HStack>
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
        <MiddleData
          sx={{
            maxWidth: '630px',
            borderRadius: '5px',
            overflowY: 'scroll !important',
            maxHeight: '100vh',
          }}
        />
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
