import React from 'react';
import Image from 'next/image';
import {
  FormControlLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { decodeAxiosError } from '@/utils/shared/axiosError';
import {
  useAddSingleStaffMemberUniversity,
  useUpdateSingleStaffMemberUniversity,
} from '@/hooks/university';
import { APISuccessResponse, ErrorResponse } from '@/@types/shared/type';
import {
  NewStaffPayload,
  TUniversityStaffProfile,
} from '@/@types/university/dtos';
import { loadCountriesOptions } from '@/utils';
import { CustomButton } from '../Button/Button';
import CustomDialog from '../dialog/CustomDialog';
import SelectAsyncPaginate from '../SelectAsyncPagination/SelectAsyncPagination';
import { errorAlert, successAlert } from '../toastAlert';
import styles from './styles.module.scss';

type Props = {
  open: boolean;
  onClose: () => void;
  filterStatus: string;
  searchQuery: string;
  staff?: TUniversityStaffProfile;
};

const validationSchema = yup.object({
  photo: yup.mixed().notRequired(),
  firstName: yup
    .string()
    .trim()
    .max(24, 'Must be 24 characters or less')
    .required('The first name field is required.'),
  lastName: yup
    .string()
    .trim()
    .max(24, 'Must be 24 characters or less')
    .required('The last name field is required.'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('The email field is required.')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      'Invalid email address'
    ),
  designation: yup
    .string()
    .trim()
    .max(24, 'Must be 24 characters or less')
    .required('The designation field is required.'),
  country: yup
    .object({
      label: yup.string(),
      value: yup.string(),
    })
    .required('The country field is required.'),
  profileStatus: yup.string().required('The profile status field is required.'),
});

const UniAddStaffModal = ({
  onClose,
  open,
  filterStatus,
  searchQuery,
  staff,
}: Props) => {
  const queryClient = useQueryClient();

  const initialValues: NewStaffPayload = {
    photo: null,
    firstName: staff?.firstName || '',
    lastName: staff?.lastName || '',
    email: staff?.email || '',
    designation: staff?.designation || '',
    country:
      staff && staff?.location && staff?.location?.country
        ? { label: staff?.location?.country, value: staff?.location?.country }
        : null,
    profileStatus: staff?.profileStatus || 'public',
    _id: staff?._id || '',
  };

  const { mutate: addNewStaff, isPending: isSubmitting } =
    useAddSingleStaffMemberUniversity({
      onSuccess: (data: APISuccessResponse) => {
        successAlert({ message: data?.message });
        onClose();
        queryClient.invalidateQueries({
          queryKey: [
            'getAllUniversityStaffMembers',
            {
              searchQuery: searchQuery,
              filterStatus: filterStatus,
            },
          ],
        });
      },
      onError: (error: ErrorResponse) => {
        errorAlert({ message: decodeAxiosError(error) });
      },
    });

  const { mutate: updateStaff, isPending: isUpdatingStaff } =
    useUpdateSingleStaffMemberUniversity({
      onSuccess: (data: APISuccessResponse) => {
        successAlert({ message: data?.message });
        onClose();
        queryClient.invalidateQueries({
          queryKey: [
            'getAllUniversityStaffMembers',
            {
              searchQuery: searchQuery,
              filterStatus: filterStatus,
            },
          ],
        });
      },
      onError: (error: ErrorResponse) => {
        errorAlert({ message: decodeAxiosError(error) });
      },
    });

  const onAddNewStaff = (values: NewStaffPayload) => {
    if (staff) {
      addNewStaff({ ...values, location: { country: values?.country?.value } });
    } else {
      updateStaff({
        ...values,
        _id: values?._id,
        location: { country: values?.country?.value },
      });
    }
  };

  return (
    <CustomDialog
      onClose={onClose}
      open={open}
      title={staff ? 'Edit Team Member' : 'Add Team Member'}
    >
      <Formik
        onSubmit={onAddNewStaff}
        initialValues={initialValues}
        autoComplete="off"
        validationSchema={validationSchema}
      >
        {({
          isValid,
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form className={styles.formContainer}>
            <div className={styles.profilePhotoBox}>
              <div>
                <Image
                  src={
                    staff?.profilePhoto ||
                    '/assets/images/user-default-image-cir.svg'
                  }
                  alt="upload"
                  width={120}
                  height={120}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <Typography className={styles.label} component="label">
                First Name
              </Typography>
              <OutlinedInput
                id="firstName"
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                rows={1}
                placeholder="Enter First Name"
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  borderRadius: 3,
                  height: 42,
                }}
                onBlur={handleBlur}
                error={touched.firstName && Boolean(errors.firstName)}
              />
              {touched.firstName && errors.firstName ? (
                <Typography className={styles.errorText}>
                  {errors.firstName}
                </Typography>
              ) : null}
            </div>
            <div className={styles.formGroup}>
              <Typography className={styles.label} component="label">
                Last Name
              </Typography>
              <OutlinedInput
                id="lastName"
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                rows={1}
                placeholder="Enter Last Name"
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  borderRadius: 3,
                  height: 42,
                }}
                onBlur={handleBlur}
                error={touched.lastName && Boolean(errors.lastName)}
              />
              {touched.lastName && errors.lastName ? (
                <Typography className={styles.errorText}>
                  {errors.lastName}
                </Typography>
              ) : null}
            </div>
            <div className={styles.formGroup}>
              <Typography className={styles.label} component="label">
                Email
              </Typography>
              <OutlinedInput
                id="email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                rows={1}
                placeholder="Enter Email"
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  borderRadius: 3,
                  height: 42,
                }}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
              />
              {touched.email && errors.email ? (
                <Typography className={styles.errorText}>
                  {errors.email}
                </Typography>
              ) : null}
            </div>
            <div className={styles.formGroup}>
              <Typography className={styles.label} component="label">
                Designation
              </Typography>
              <OutlinedInput
                id="designation"
                type="text"
                name="designation"
                value={values.designation}
                onChange={handleChange}
                rows={1}
                placeholder="Enter Designation"
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  borderRadius: 3,
                  height: 42,
                }}
                onBlur={handleBlur}
                error={touched.designation && Boolean(errors.designation)}
              />
              {touched.designation && errors.designation ? (
                <Typography className={styles.errorText}>
                  {errors.designation}
                </Typography>
              ) : null}
            </div>
            <div className={styles.formGroup}>
              <Typography className={styles.label} component="label">
                Country
              </Typography>
              <SelectAsyncPaginate
                name="country"
                loadOptions={loadCountriesOptions as any}
                onChange={(option) => {
                  setFieldValue('country', option);
                }}
                value={values.country}
                onBlur={handleBlur}
                placeholder="Select country"
                menuPlacement="auto"
                styles={{
                  menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999,
                    textTransform: 'capitalize',
                  }),
                }}
                menuPortalTarget={document.body}
              />
              {touched.country && errors.country ? (
                <Typography className={styles.errorText}>
                  {errors.country}
                </Typography>
              ) : null}
            </div>
            <div className={styles.formGroup}>
              <Typography className={styles.label} component="label">
                Profile Status
              </Typography>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={values.profileStatus}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="public"
                  name="profileStatus"
                  control={
                    <Radio
                      classes={{
                        root: styles.radio_box,
                        checked: styles.checked,
                      }}
                    />
                  }
                  label="Public"
                  classes={{ root: styles.box_label }}
                />
                <FormControlLabel
                  value="private"
                  name="profileStatus"
                  control={
                    <Radio
                      classes={{
                        root: styles.radio_box,
                        checked: styles.checked,
                      }}
                    />
                  }
                  label="Private"
                  classes={{ root: styles.box_label }}
                />
              </RadioGroup>
              {touched.profileStatus && Boolean(errors.profileStatus) && (
                <Typography className={styles.errorText}>
                  {errors.profileStatus}
                </Typography>
              )}
            </div>
            <CustomButton
              type="submit"
              label="Save"
              fullWidth
              className={styles.btn}
              isLoading={isSubmitting || isUpdatingStaff}
              disabled={isSubmitting || !isValid || isUpdatingStaff}
            />
          </Form>
        )}
      </Formik>
    </CustomDialog>
  );
};

export default UniAddStaffModal;
