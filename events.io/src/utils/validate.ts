import { FormikErrors } from 'formik';
import z from 'zod';

export const minFifthywordsValidateSchema = z
  .string({ invalid_type_error: 'This field is required' })
  .refine(
    (value) => {
      const words = value.trim().split(/\s+/);
      return words.length >= 50;
    },
    {
      message: 'Must have a minimum of 50 words.',
    }
  );

/**
 * @description validate rich text
 * @param min the min number of words
 * @param max the max number of words
 * @returns
 */
export const validateRichText = (min: number, max: number) => {
  const _z =
    min == 0
      ? z.string().nullable()
      : z.string({ errorMap: () => ({ message: 'This field is required' }) });
  return _z
    .refine(
      (value) => {
        const words = value?.trim()?.split(/\s+/);

        return min > 0 ? !!value && (words || '')?.length >= min : true;
      },
      {
        message: `Must have a minimum of ${min} words.`,
      }
    )
    .refine(
      (value) => {
        const valueNotUndefined = !!value && value?.length > 0;
        const words = value?.trim().split(/\s+/);

        // returns true when value is undefined because whatever makes the control flow to reach here with undefined value, it means the value is optional
        return valueNotUndefined ? (words || '').length <= max : true;
      },
      {
        message: `Must have a maximum of ${max} words.`,
      }
    );
};

export const filterEmployersSchema = z.object({
  name: z.string(),
  category: z.array(z.string()),
  location: z.array(z.string()),
  size: z.array(z.string()),
  industry: z.array(z.string()),
});

export const filterJobsSchema = z.object({
  salaryRange: z.string(),
  location: z.string(),
  skills: z.string(),
  jobType: z.string(),
  workSpaceType: z.string(),
});

export const optionSchema = z.object(
  {
    label: z.string(),
    value: z.string(),
    __isNew__: z.boolean().optional(),
  },
  { invalid_type_error: 'This field is required' }
);

export const countryOptionSchema = z.object(
  {
    label: z.string(),
    value: z.string(),
    flag: z.string().optional(),
    code: z.string(),
  },
  { invalid_type_error: 'This field is required' }
);

export const candidateSkillsSchema = z.object({
  skill: optionSchema,
  yearsOfExperience: optionSchema,
  rating: z
    .number()
    .min(1, { message: 'Enter a valid number from 1-10' })
    .max(10, { message: 'Enter a valid number from 1-10' }),
  _id: z.string().optional(),
});

export const stepFormJobTitleSchema = z.object({
  jobTitles: optionSchema.optional(),
  yearsOfExperience: z.string(),
});

export const stepFormSkillsSchema = z.object({
  skills: z.array(candidateSkillsSchema),
});

export const optionWithLogoSchema = z.object(
  {
    label: z.string(),
    value: z.string(),
    id: z.string().optional(),
    logo: z.string().nullable().optional(),
    __isNew__: z.boolean().optional(),
  },
  { invalid_type_error: 'This field is required' }
);

export const candidateExperienceSchema = z
  .object({
    accountId: z.string().nullish(),
    jobTitle: optionSchema,
    experienceLevel: optionSchema,
    employerVerified: z.boolean(),
    verificationBlockchainUrl: z.string().nullish(),
    employer: optionWithLogoSchema,
    location: z.string().nullish(),
    employerLogo: z.string().nullish(),
    city: optionSchema.nullish(),
    country: optionSchema,
    jobType: optionSchema,
    currentlyWorksHere: z.boolean(),
    startDate: z.string({ invalid_type_error: 'Enter valid start date' }),
    endDate: z.string({ invalid_type_error: 'Enter valid end date' }).nullish(),
    skills: z
      .array(optionSchema.nullable(), {
        invalid_type_error: 'Choose at least one skill',
      })
      .nullable(),
    description: validateRichText(50, 150),
    _id: z.string().nullish(),
    employeeId: z
      .string({ invalid_type_error: 'This field is required' })
      .nullish(),
    website: z
      .string({ invalid_type_error: 'This field is required' })
      .url({ message: 'Enter valid URL' })
      .nullish(),
    employerEmail: z
      .string({ invalid_type_error: 'This field is required' })
      .email({ message: 'Enter valid email' })
      .nullish(),
    workplaceType: optionSchema.nullish(),
  })
  .partial()
  .superRefine((input, ctx) => {
    if (!input.employer?.id && !input.website) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'The website URL is required.',
        path: ['website'],
      });
    }
    return false;
  });

export const stepFormExperiencesSchema = z.object({
  experiences: z.array(candidateExperienceSchema),
});

export const candidateEducationSchema = z
  .object({
    accountId: z.string().nullish(),
    institutionId: z.string().nullish(),
    institutionName: z.string().nullish(),
    institutionLogo: z.string().nullish(),
    classYear: z.object(
      {
        label: z.string(),
        value: z.string(),
      },
      { invalid_type_error: 'This field is required' }
    ),
    institutionVerified: z.boolean().nullish(),
    location: z.string().nullish(),
    institution: optionWithLogoSchema,
    credential: optionSchema,
    discipline: optionSchema,
    // gradYear: z.any().or(z.date()).transform(arg => new Date(arg)).optional(),
    currentlySchoolHere: z.boolean(),
    startDate: z.string({ invalid_type_error: 'Enter start date' }),
    endDate: z.string({ invalid_type_error: 'Enter end date' }).nullish(),
    // .nullable()
    description: validateRichText(0, 100),
    website: z
      .string({ invalid_type_error: 'This field is required' })
      .url({ message: 'Enter a valid URL' })
      .nullish(),
    _id: z.string().nullish(),
    verificationStatus: z.string().nullish(),
    institutionEmail: z
      .string({ invalid_type_error: 'This field is required' })
      .email({ message: 'Enter valid Email' })
      .nullish(),
    studentId: z
      .string({ invalid_type_error: 'This field is required' })
      .nullish(),
    cgpa: z
      .string({ invalid_type_error: 'This field is required' })
      .regex(/^[0-9%\/.]*$/, { message: 'Enter a valid CPGA' })
      .nullish(),
    city: optionSchema.nullish(),
    country: optionSchema.nullish(),
  })
  .partial()
  .superRefine((input, ctx) => {
    if (!input?.institution?.id && !input.website) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'The website URL is required.',
        path: ['website'],
        params: {
          website: input.website,
        },
      });
    }
  });

export const stepFormEducationSchema = z.object({
  educations: z.array(candidateEducationSchema),
});

export const candidateCertificationSchema = z.object({
  name: optionSchema.optional(),
  // accountId: optionSchema.optional(),
  issuerId: z.string().optional(),
  issuerName: optionSchema.optional(),
  issuerType: z.string().optional(),
  issueDate: z
    .any()
    .or(z.date())
    .transform((arg) => new Date(arg)),
  expirationDate: z
    .any()
    .or(z.date())
    .transform((arg) => new Date(arg))
    .optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url().optional(),
  skills: z.array(optionSchema).optional(),
  _id: z.string().optional(),
  // discipline: optionSchema.optional(),
});
export const stepFormCertificationSchema = z.object({
  certifications: z.array(candidateCertificationSchema),
});

export const candidateAwardSchema = z.object({
  issueDate: z
    .any()
    .or(z.date())
    .transform((arg) => new Date(arg)),
  _id: z.string().optional(),
  title: z.string(),
  issuer: z.string(),
  description: validateRichText(0, 150),
  associatedWorkExperienceId: optionSchema.optional(),
});

export const stepFormAwardsSchema = z.object({
  awards: z.array(candidateAwardSchema),
});

export const profileLinkSchema = z.object({
  name: optionSchema,
  url: z.string(),
});

export const stepFormPersonalInfosSchema = z.object({
  country: optionSchema,
  state: optionSchema,
  title: optionSchema.optional().nullable(),
  gender: optionSchema,
  city: optionSchema.optional(),
  dateOfBirth: z
    .any()
    .or(z.date())
    .transform((arg) => new Date(arg))
    .optional(),
  nationality: optionSchema,
  languages: z.array(optionSchema),
  interests: z.array(optionSchema),
});

export const stepFormOpportunitySchema = z.object({
  jobTypes: z.array(z.string()),
  experienceLevels: z.array(z.string()),
});

export const stepFormInterestWorkSchema = z.object({
  countries: z.array(optionSchema),
  openToRemoteJobs: z.boolean(),
  timezones: optionSchema.optional(),
});

export const stepFormSalarySchema = z.object({
  hourlyRate: z.string(),
  currency: z.object({
    label: z.string(),
    value: z.string(),
  }),
  monthlySalary: z.string(),
});

export const stepFormSummarySchema = z.object({
  summary: validateRichText(0, 150),
});

export const socialLinksSchema = z.object(
  {
    _id: z.string().optional(),
    network: optionSchema,
    url: z.string().url(),
  },
  { invalid_type_error: 'This is a required field' }
);

export const obSocialLinksSchema = z.object({
  _id: z.string().optional(),
  network: optionSchema.refine(
    (val) => {
      return val.label.trim().length > 0 && val.value.trim().length > 0;
    },
    { message: 'Invalid network option' }
  ),
  url: z.string().url(),
});

export const phoneNumberSchema = z.object(
  {
    phone_code: optionSchema,
    phone: z.string(),
  },
  { invalid_type_error: 'This is a required field' }
);

export const updatedCandidateProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  title: optionSchema.optional().nullable(),
  jobTitles: z.object({
    label: z.string(),
    value: z.string(),
  }),
  yearsOfExperience: optionSchema,
  monthlySalary: z.number(),
  hourlyRate: z.number(),
  socialLinks: z.array(socialLinksSchema),
  currency: z.object({
    label: z.string(),
    value: z.string(),
  }),
  publicPhoneNumbers: z.array(phoneNumberSchema),
});

export const updatedCandidatePersonalInfoSchema = z.object({
  ageGroup: z.string(),
  nationality: optionSchema,
  country: optionSchema,
  languages: z.array(optionSchema),
  interests: z.array(optionSchema),
  dateOfBirth: z
    .any()
    .or(z.date())
    .transform((arg) => new Date(arg))
    .optional(),
  state: optionSchema,
  gender: optionSchema,
  city: optionSchema,
});

export const filterHiringJobSchema = z.object({
  name: z.string(),
  period: z.string(),
  status: z.string(),
  company: z.string(),
});

type RoleErrors = {
  title: string;
  category: string;
  description: string;
  data: string;
};

export const isEmpty = (
  errors: FormikErrors<{ csv: File | null } | RoleErrors>,
  touched: Record<string, boolean>
) => {
  if (Object.keys(touched).length === 0) {
    return false;
  } else {
    // return errors && Object.keys(value).length === 0;
    return !Object.values(errors).some((error) => !!error);
  }
};

export const stepFormIDVerification = z.object({
  summary: z.string().min(50, 'Summary cannot be less than 50 words'),
});

export const stepFormProfileLinkSchema = z.object({
  links: z.array(obSocialLinksSchema),
});

export const videoLinkSchema = z.object({
  _id: z.string().optional(),
  url: z.string().url('Invalid Video URL'),
});

export const eventVideoLinkSchema = z.array(videoLinkSchema);

export const LocationSchema = z.object({
  address: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  zipcode: z.string().nullable().optional(),
  countryIsoCode: z.string().nullable().optional(),
  stateIsoCode: z.string().nullable().optional(),
  lat: z.number().nullable().optional(),
  long: z.number().nullable().optional(),
});

export const employerEventSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    eventLink: z.string().optional(),
    checkInTime: z.object({
      label: z.string().optional(),
      value: z.string().optional(),
    }),
    type: z.string().min(1, 'Event type is required'),
    category: z.object({
      label: z.string().min(1, 'Category is required'),
      value: z.string().min(1, 'Category is required'),
    }),
    videos: z
      .array(
        z.string().url('Video Link must be a valid URL').nullable().optional()
      )
      .nullable()
      .optional(),
    location: LocationSchema.nullable().optional(),
    venue: z.string().optional(),
    startTime: z.object({
      label: z.string().min(1, 'Start time is required'),
      value: z.string().min(1, 'Start time is required'),
    }),
    endTime: z.object({
      label: z.string().min(1, 'End time is required'),
      value: z.string().min(1, 'End time is required'),
    }),
    timezone: z.object({
      label: z.string().min(1, 'Timezone is required'),
      value: z.string().min(1, 'Timezone is required'),
    }),
    about: z.string().min(1, 'About is required'),
    photos: z.array(z.string().url('Photo must be a valid URL')),
    summary: z
      .string()
      .min(1, 'Summary is required')
      .max(140, 'Summary cannot exceed 140 characters'),
    date: z.string().min(1, 'Date is required'),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'virtual') {
      if (!data.eventLink || data.eventLink.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Event link is required for virtual events',
          path: ['eventLink'],
        });
      }
    } else {
      if (!data.location || !isLocationFilled(data.location)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Location is required for non-virtual events',
          path: ['location'],
        });
      }
      if (!data.venue) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Venue is required for non-virtual events',
          path: ['venue'],
        });
      }
    }
  });
const selectOptionSchema = z.object({
  label: z.string({ invalid_type_error: 'This field is required' }).optional(),
  value: z.string({ invalid_type_error: 'This field is required' }).optional(),
});

const registrationSchema = z
  .object({
    endDate: z
      .string({ invalid_type_error: 'End date is required' })
      .optional(),
    startTime: selectOptionSchema,
    startDate: z
      .string({ invalid_type_error: 'Start date is required' })
      .optional(),
    endTime: selectOptionSchema,
  })
  .optional();

export const eventTicketSchema = z
  .object({
    _id: z.string(),
    eventType: z.enum(['free', 'paid']).optional(),
    amount: z
      .number({ invalid_type_error: 'Amount should be a number' })
      .optional(),
    registration: registrationSchema,
    currency: selectOptionSchema.optional(),

    hasPackages: z.boolean(),
    hasCoupons: z.boolean(),
    tickets: z
      .number({ invalid_type_error: 'Tickets should be a number' })
      .optional(),
    packages: z
      .array(
        z
          .object({
            id: z.string().optional(),
            package: z.string().optional(),
            amount: z.number().optional(),
            tickets: z.number().optional(),
            content: z.string().optional(),
          })
          .optional()
      )
      .optional(),
    coupons: z
      .array(
        z
          .object({
            id: z.string().optional(),
            name: z.string().optional(),
            tickets: z.number().optional(),
            discount: z.number().optional(),
            discountType: z.string().optional(),
            limitedTo: z.string().nullable().optional(),
            targetGroup: z.string().nullable().optional(),
            targetGroupCategory: z.string().nullable().optional(),
            targetGroupIds: z
              .array(z.string().nullable())
              .nullable()
              .optional(),
          })
          .optional()
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.eventType === 'paid') {
      if (data.amount === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "For paid events, 'amount' is required and must be greater than 0",
          path: ['amount'],
        });
      } else if (
        !data.currency ||
        !data.currency.value ||
        data.currency.value.trim() === ''
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'For paid events, currency is required',
          path: ['currency'],
        });
      }

      if (!data.registration) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Registration' is required",
          path: ['registration'],
        });
      } else {
        const { startDate, endDate, startTime, endTime } = data.registration;
        if (!startDate || !endDate || !startTime || !endTime) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              'All registration fields are required for paid/free events',
            path: ['registration'],
          });
        }
      }

      if (
        data.tickets === undefined ||
        (data.tickets < 0 && data.tickets !== -1)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Tickets must be a non-negative number or -1 for unlimited',
          path: ['tickets'],
        });
      }
    }
  });

export const publishEventSchema = z.object({
  _id: z.string().nullable().optional(),
  filters: z
    .object({
      credentials: z.array(z.string()).optional(),
      classYears: z.array(z.string()).optional(),
      public: z.boolean().optional(),
      pastEmployees: z.boolean().optional(),
      presentEmployees: z.boolean().optional(),
      pastAttendees: z.boolean().optional(),
    })
    .optional(),
  saveInstead: z.boolean().optional(),
  officials: z.array(
    z.object({
      id: z.string().nullish(),
      role: z.string().nullish(),
      package: z.string().nullish(),
    })
  ),
});

export function isLocationFilled(location: any): boolean {
  return location && location.address && location.city && location.country;
}
