'use client';

import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  OutlinedInput,
  Stack,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import {
  // FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material/';
import { useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { onAxiosError } from '@/utils/shared/axiosError';
import {
  CustomButton,
  // CustomSelectInput,
  SelectAsyncPaginate,
} from '@/components/shared';
import { useGiveCandidateFeedback } from '@/hooks/candidate';
import { GiveFeedbackRequestDTO } from '@/hooks/candidate/dtos';
import { ErrorResponse, UserTypes } from '@/@types/shared/type';
// import { reasonPurchasingBusinessCardOptions } from '@/constants';
import { loadCandidateDiscoveryMediumsOptions } from '@/utils';
import styles from './give-feedback-modals.module.scss';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  userType?: UserTypes;
  // setSuccess: (value: boolean) => void;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const inputSelectStyles = {
  menuList: (base) => ({
    ...base,
    maxHeight: '155px',
    with: '100%',
    minWidth: '140px',
    // fontSize: "14px",
    zIndex: 1,
  }),
  menu: (provided, state) => ({
    ...provided,
    width: '100%',
    fontSize: '13px',
    fontWeight: 500,
    minWidth: state.selectProps.minWidth,
    color: state.selectProps.menuColor,
  }),
};

export const GiveFeedbackModal: React.FC<DialogProps> = ({
  open,
  onClose,
  setSuccess,
}) => {
  const queryClient = useQueryClient();
  const [_, setError] = useState('');
  // const [reasonRequired, setReasonRequired] = useState(true);

  interface FormValues {
    uiAndUxRating: number | null;
    mostValuableFeatures: string;
    featureImprovementSuggestions: string;
    // willPurchase: boolean;
    // reasonForNotPurchasing: { value: string; label: string } | null;
    generalThoughts: string;
    discoveredVaurseThrough: { value: string; label: string } | null;
  }

  const initialValues: FormValues = {
    uiAndUxRating: null,
    mostValuableFeatures: '',
    featureImprovementSuggestions: '',
    // willPurchase: true,
    // reasonForNotPurchasing: null,
    generalThoughts: '',
    discoveredVaurseThrough: null,
  };

  const { mutate: giveFeedback, isPending: isLoading } =
    useGiveCandidateFeedback({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['candidateProfile'],
        });
        // reset form
        formik.resetForm();
        formik.setSubmitting(false);
        onClose();
        setSuccess(true);
      },
      onError: (error: ErrorResponse) => {
        onAxiosError(error, setError, true);
      },
    });

  const formik = useFormik<FormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      uiAndUxRating: yup.number().required('Please select a rating'),
      mostValuableFeatures: yup
        .string()
        .required('Please enter the most valuable features'),
      featureImprovementSuggestions: yup
        .string()
        .required('Please enter the feature improvement suggestions'),
      // willPurchase: yup.boolean().required('Please select an option'),
      // reasonForNotPurchasing: yup
      //   // .mixed()
      //   // .nullable()
      //   // .test('required', 'Please select a reason', function (value) {
      //   //   if (!formik.values.willPurchase) {
      //   //     return value !== null;
      //   //   }
      //   //   return true;
      //   // }),
      //   .object()
      //   .nullable()
      //   .shape({
      //     value: yup
      //       .string()
      //       .nullable()
      //       .test('required', 'Please select a reason', function (value) {
      //         if (!formik.values.willPurchase) {
      //           return value === '';
      //         }
      //         return true;
      //       }),
      //     label: yup.string().required('Please select a reason'),
      //   }),
      generalThoughts: yup
        .string()
        .required('Please enter your general thoughts'),
      discoveredVaurseThrough: yup
        .object()
        .required('Please select how you discovered Vaurse'),
    }),
    onSubmit: (values) => {
      const payload: GiveFeedbackRequestDTO = {
        uiAndUxRating: values.uiAndUxRating as number,
        mostValuableFeatures: values.mostValuableFeatures,
        featureImprovementSuggestions: values.featureImprovementSuggestions,
        // willPurchaseBusinessCardPhysicalCopy: values.willPurchase,
        // reasonForNotPurchasingBusinessCardPhysicalCopy: values
        //   .reasonForNotPurchasing?.value as string,
        generalThoughts: values.generalThoughts,
        discoveredVaurseThrough: values.discoveredVaurseThrough
          ?.value as string,
      };

      giveFeedback(payload);
    },
  });

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="lg"
      classes={{
        root: styles.dialog_root,
        container: styles.dialog_container,
        paper: styles.dialog_paper,
      }}
    >
      <>
        <DialogTitle className={styles.dialog_header}>
          <Typography variant="h5" className={styles.modal_title}>
            {'Give Feedback'}
          </Typography>

          <IconButton
            aria-label="close dialog"
            onClick={() => onClose()}
            className={styles.close_dialog_btn}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider
          className={styles.devider}
          sx={{ borderColor: '#ECECED', width: '100%' }}
        />
      </>

      <DialogContent className={styles.dialog_content}>
        <form onSubmit={formik.handleSubmit}>
          <Box mt={1}>
            <Typography variant="h6" className={styles.content_title}>
              Share your thoughts and help us enhance your experience.
            </Typography>

            <Stack flex={1} gap={0.5} mb={2}>
              <Typography className={styles.input_label}>
                How would you rate the user interface and ease of navigation on
                the Vaurse platform?
              </Typography>

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={formik.values.uiAndUxRating}
                onChange={(e) =>
                  formik.setFieldValue('uiAndUxRating', e.target.value)
                }
                onBlur={formik.handleBlur}
                className={styles.radio_group_rating}
              >
                <Typography variant="caption" className={styles.radio_label}>
                  Bad
                </Typography>
                {[1, 2, 3, 4, 5].map((value) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={
                      <Radio
                        classes={{
                          root: styles.radio_box,
                          checked: styles.checked,
                        }}
                      />
                    }
                    label={value}
                    classes={{ root: styles.box_label }}
                  />
                ))}
                <Typography variant="caption" className={styles.radio_label}>
                  Great
                </Typography>
              </RadioGroup>

              {formik.touched.uiAndUxRating && formik.errors.uiAndUxRating ? (
                <Typography px={1} className="text-danger fs-12">
                  {formik.errors.uiAndUxRating}
                </Typography>
              ) : null}
            </Stack>

            <Stack flex={1} gap={0.5} mb={2}>
              <Typography className={styles.input_label}>
                What features do you find most valuable or beneficial on Vaurse?
              </Typography>
              <OutlinedInput
                id="mostValuableFeatures"
                name="mostValuableFeatures"
                value={formik.values.mostValuableFeatures}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                inputComponent={TextareaAutosize}
                rows={3}
                fullWidth
                placeholder="Input text"
                sx={{
                  width: '100%',
                  fontSize: 12,
                  fontWeight: 600,
                  borderRadius: 2,
                  padding: '8px 10px',
                  '& .MuiOutlinedInput-input': {
                    width: '100%',
                    minHeight: '65px',
                    padding: 0,
                    resize: 'vertical',
                  },
                }}
              />
              {formik.touched.mostValuableFeatures &&
                formik.errors.mostValuableFeatures ? (
                <Typography
                  sx={{ fontSize: 12, mt: 0, mx: 1 }}
                  className="text-danger"
                >
                  {formik.errors.mostValuableFeatures}
                </Typography>
              ) : null}
            </Stack>

            <Stack flex={1} gap={0.5} mb={2}>
              <Typography className={styles.input_label}>
                Is there anything specific you would like to see improved or
                added to enhance your experience with Vaurse?
              </Typography>
              <OutlinedInput
                id="featureImprovementSuggestions"
                name="featureImprovementSuggestions"
                value={formik.values.featureImprovementSuggestions}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // inputComponent={'textarea'}
                inputComponent={TextareaAutosize}
                fullWidth
                placeholder="Input text"
                sx={{
                  width: '100%',
                  fontSize: 12,
                  fontWeight: 600,
                  borderRadius: 2,
                  padding: '8px 10px',
                  '& .MuiOutlinedInput-input': {
                    width: '100%',
                    minHeight: '65px',
                    padding: 0,
                    resize: 'vertical',
                  },
                }}
              />
              {formik.touched.featureImprovementSuggestions &&
                formik.errors.featureImprovementSuggestions ? (
                <Typography
                  sx={{ fontSize: 12, mt: 0, mx: 1 }}
                  className="text-danger"
                >
                  {formik.errors.featureImprovementSuggestions}
                </Typography>
              ) : null}
            </Stack>

            {/* <Stack flex={1} gap={0.5} mb={1}>
              <Typography className={styles.input_label}>
                Would you consider purchasing a physical copy of Your Digital
                Business Card in NFC plastic, carbon or metal for a one time fee
                starting at 25 USD  if available?
              </Typography>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={formik.values.willPurchase}
                  // onChange={formik.handleChange}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setReasonRequired(e.target.value === 'true');
                    if (!e.target.value) {
                      formik.setFieldValue('reasonForNotPurchasing', null); // Reset reasonForNotPurchasing when willPurchase is false
                    }
                  }}
                >
                  <FormControlLabel
                    value={true}
                    name="willPurchase"
                    control={
                      <Radio
                        classes={{
                          root: styles.radio_box,
                          checked: styles.checked,
                        }}
                      />
                    }
                    label="Yes"
                    classes={{ root: styles.box_label }}
                  />
                  <FormControlLabel
                    value={false}
                    name="willPurchase"
                    control={
                      <Radio
                        classes={{
                          root: styles.radio_box,
                          checked: styles.checked,
                        }}
                      />
                    }
                    label="No"
                    classes={{ root: styles.box_label }}
                  />
                </RadioGroup>
              </FormControl>
              {formik.touched.willPurchase &&
                Boolean(formik.errors.willPurchase) && (
                  <div className="text-danger fs-12 mt-8 ms-12">
                    {formik.errors.willPurchase}
                  </div>
                )}
            </Stack> */}

            {/* {!reasonRequired ? (
              <Stack flex={1} gap={0.5} mb={2}>
                <CustomSelectInput
                  id="reasonForNotPurchasing"
                  name="reasonForNotPurchasing"
                  value={formik.values.reasonForNotPurchasing}
                  options={reasonPurchasingBusinessCardOptions}
                  onChange={(option) =>
                    formik.setFieldValue('reasonForNotPurchasing', option)
                  }
                  onBlur={formik.handleBlur}
                  placeholder="Select"
                  className="fs-12 fw-600 w-full"
                  styles={inputSelectStyles}
                  classNamePrefix="container_interview_modal"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
                {formik.errors.reasonForNotPurchasing ? (
                  <Typography px={1} className="text-danger fs-12">
                    {formik.errors.reasonForNotPurchasing}
                  </Typography>
                ) : null}
              </Stack>
            ) : null} */}

            <Stack flex={1} gap={0.5} mb={2}>
              <Typography className={styles.input_label}>
                Share your thoughts or suggestions about Vaurse – your input is
                highly valued!
              </Typography>
              <OutlinedInput
                id="generalThoughts"
                name="generalThoughts"
                value={formik.values.generalThoughts}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                inputComponent={TextareaAutosize}
                fullWidth
                placeholder="Input text"
                sx={{
                  width: '100%',
                  fontSize: 13,
                  fontWeight: 600,
                  borderRadius: 2,
                  padding: '8px 10px',
                  '& .MuiOutlinedInput-input': {
                    width: '100%',
                    minHeight: '65px',
                    padding: 0,
                    resize: 'vertical',
                  },
                }}
              />
              {formik.touched.generalThoughts &&
                formik.errors.generalThoughts ? (
                <Typography
                  sx={{ fontSize: 12, mt: 0, mx: 1 }}
                  className="text-danger"
                >
                  {formik.errors.generalThoughts}
                </Typography>
              ) : null}
            </Stack>

            <Stack flex={1} gap={0.5} mb={2}>
              <Typography className={styles.input_label}>
                How did you hear about vaurse?
              </Typography>
              <SelectAsyncPaginate
                id="discoveredVaurseThrough"
                name="discoveredVaurseThrough"
                value={formik.values.discoveredVaurseThrough}
                loadOptions={loadCandidateDiscoveryMediumsOptions}
                onChange={(option) =>
                  formik.setFieldValue('discoveredVaurseThrough', option)
                }
                onBlur={formik.handleBlur}
                placeholder="Select"
                className="fs-12 fw-600 w-full"
                styles={inputSelectStyles}
                classNamePrefix="container_interview_modal"
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
              {formik.touched.discoveredVaurseThrough &&
                formik.errors.discoveredVaurseThrough ? (
                <Typography px={1} className="text-danger fs-12">
                  {formik.errors.discoveredVaurseThrough}
                </Typography>
              ) : null}
            </Stack>

            <Stack flex={1}>
              <CustomButton
                type="submit"
                label="Submit Feedback"
                buttonClass="next_btn_full_width"
                disabled={!(formik?.isValid && formik?.dirty)}
                isLoading={isLoading}
                sx={{
                  '&.Mui-disabled': {
                    background: '#e2e2e4',
                    color: '#b3b1b8',
                  },
                }}
              />
            </Stack>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};
