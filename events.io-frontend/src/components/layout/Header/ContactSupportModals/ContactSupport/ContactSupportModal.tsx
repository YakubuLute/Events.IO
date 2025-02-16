'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Button,
  DialogContent,
  InputLabel,
  OutlinedInput,
  Typography,
  Stack,
  TextareaAutosize,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { CustomButton, SelectAsyncPaginate } from '@/components/shared';
import { onAxiosError } from '@/utils/shared/axiosError';
import { ErrorResponse, UserTypes } from '@/@types/shared/type';

import { loadSupportTicketSubjectsOptions } from '@/utils';
import { useCreateSupportTicketFn } from '@/hooks/shared';

import styles from "./contact-support.module.scss";
import { AttachIcon } from '@/components/shared/SVG-components';


interface DialogProps {
  open?: boolean;
  onClose: () => void;
  onOpen: () => void;
  userType?: UserTypes;
  // setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const inputSelectStyles = {
  menuList: base => ({
    ...base,
    maxHeight: "155px",
    with: "100%",
    minWidth: "140px",
    // fontSize: "14px",
    zIndex: 1,
  }),
  menu: (provided, state) => ({
    ...provided,
    width: '100%',
    fontSize: "13px",
    fontWeight: 500,
    minWidth: state.selectProps.minWidth,
    color: state.selectProps.menuColor,
  })
};

export const ContactSupportModal: React.FC<DialogProps> = ({ onClose, onOpen }) => {
  const [_, setError] = useState('');

  interface FormValues {
    subject: { value: string; label: string } | null;
    detail: string;
    attachments: File[] | string[];
  }

  const initialValues: FormValues = {
    subject: null,
    detail: '',
    attachments: [],
  };

  const { mutate: createSupportTicket, isPending: isLoading } =
    useCreateSupportTicketFn({
      onSuccess: () => {
        // reset form
        formik.resetForm();
        formik.setSubmitting(false);
        onClose();
        onOpen();
      },
      onError: (error: ErrorResponse) => {
        onAxiosError(error, setError, true);
      },
    });


  const formik = useFormik<FormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      subject: yup.object().required('Please select a subject'),
      detail: yup.string().required('Please enter details'),
      attachments: yup.array().required().ensure(),
    }),
    onSubmit: (values) => {
      const payload = new FormData();
      payload.append('subject', values.subject?.value as string);
      payload.append('detail', values.detail);
      values.attachments.forEach((file) => {
        payload.append('attachments', file);
      });

      createSupportTicket(payload);
    }
  });

  const handleFileAttach = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // return if no file
    if (!file) return;
    if (formik.values.attachments.includes(file)) return;

    formik.setFieldValue('attachments', [...formik.values.attachments, file]);
  }

  return (
    <DialogContent className={styles.dialog_content}>
      <form onSubmit={formik.handleSubmit}>
        <Box mt={1}>
          <Stack flex={1} gap={0.5} mb={2}>
            <InputLabel className={styles.input_label}>
              Suject
            </InputLabel>
            <SelectAsyncPaginate
              id="subject"
              name="subject"
              loadOptions={loadSupportTicketSubjectsOptions}
              onChange={(option) => {
                formik.setFieldValue('subject', option);
              }}
              value={formik.values.subject}
              placeholder="Select Suject"
              className="fs-12 fw-600 w-full"
              styles={inputSelectStyles}
              classNamePrefix="container_interview_modal"
              components={{
                IndicatorSeparator: () => null
              }}
            />
            {formik.errors.subject ? (
              <Typography variant="caption" px={1} className="text-danger fs-12 fw-400">
                {formik.errors.subject}
              </Typography>
            ) : null}
          </Stack>

          <Stack flex={1} gap={0.5} mb={2}>
            <InputLabel className={styles.input_label}>
              Please provide details
            </InputLabel>
            <OutlinedInput
              multiline={true}
              id="detail"
              name="detail"
              value={formik.values.detail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
            {formik.touched.detail && formik.errors.detail ? (
              <Typography sx={{ fontSize: 12, mt: 0, mx: 1 }} className="text-danger">
                {formik.errors.detail}
              </Typography>
            ) : null}
          </Stack>

          <Box gap={0.5} mb={2}>
            <Button
              id="attachments"
              variant="text"
              component="label"
              onBlur={formik.handleBlur}
              startIcon={<AttachIcon width="14" height="13" />}
              sx={{ display: 'inline-flex', fontSize: 12, borderRadius: 2, pb: 1 }}
              disabled={Boolean(formik.values.attachments.length >= 3)}
            >
              <input
                id="attachments"
                title="attachments"
                name="attachments"
                type="file"
                multiple
                onChange={handleFileAttach}
                className="hidden" // hidden
                // onBlur={formik.handleBlur}
                disabled={Boolean(formik.values.attachments.length >= 3)}
              />
              Attach a file
            </Button>
            <Box>
              {formik.values.attachments ? (
                formik.values.attachments.map((file, index) => (
                  <Stack key={index} direction="row" alignItems="center">
                    <Typography variant='body2' sx={{ fontSize: 10, fontWeight: 500 }} className={styles.file_name}>
                      {file instanceof File ? file.name : file}
                    </Typography>

                    <IconButton
                      size="small"
                      sx={{ ml: 1, p: '2px', bgcolor: '#f2f4ff' }}
                      onClick={() => {
                        formik.setFieldValue(
                          'attachments',
                          formik.values.attachments.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      <CloseIcon sx={{ fontSize: 13 }} />
                    </IconButton>
                  </Stack>
                ))
              ) : 'No file selected'}
            </Box>

            {formik.touched.attachments && formik.errors.attachments && (
              <Typography sx={{ fontSize: 12, mt: 0, mx: 1 }} className="text-danger">
                {formik.errors.attachments as string}
              </Typography>
            )}
          </Box>

          <Stack flex={1}>
            <CustomButton
              type='submit'
              label="Submit"
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
  )
}
