import * as yup from 'yup';

export const schema = yup.object({
  fullName: yup
    .string()
    .required()
    .matches(/^[a-z ,.'-]+$/i),
  employeeId: yup.string().required(),
  jobTitle: yup
    .string()
    .required()
    .matches(/^[a-z ,.'-]+$/i),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
  description: yup
    .string()
    .required()
    .matches(/^[a-z ,.'-]+$/i),
  fullNamePresent: yup.boolean().oneOf([true], 'Field must be checked'),
  employeeIdPresent: yup.boolean().oneOf([true], 'Field must be checked'),
  jobTitlePresent: yup.boolean().oneOf([true], 'Field must be checked'),
  startDatePresent: yup.boolean().oneOf([true], 'Field must be checked'),
  endDatePresent: yup.boolean().oneOf([true], 'Field must be checked'),
  descriptionPresent: yup.boolean().oneOf([true], 'Field must be checked'),
});
