import { z } from 'zod';

import { locationSchema, socialLinkSchema } from '../shared/sharedValidation';
import { optionSchema } from '../validate';

export const employerSignUpProfileSchema = z.object({
  firstName: z.string({
    required_error: 'Please enter your first name',
  }),
  lastName: z.string({
    required_error: 'Please enter your last name',
  }),
  phoneNumber: z.string({
    required_error: 'Please enter your phone number',
  }),
  jobTitle: optionSchema,
  country: optionSchema,
  qualificationsOffered: z.array(z.string()),
});

export const employerDetailsSchema = z.object({
  employerName: z.string({
    required_error: 'Please enter your Name',
  }),
  website: z.string({
    required_error: 'Please enter your website',
  }),
  location: locationSchema,
  companySize: optionSchema,
  email: z.string({
    required_error: 'Please enter your email',
  }),
  phoneNumber: z.string({
    required_error: 'Please enter your phone number',
  }),
  socialLinks: socialLinkSchema,
  about: z.string({
    required_error: 'Please enter about your company ',
  }),
  industry: optionSchema,
  currency: optionSchema,
});

export const employerDetailsSchemaFm = z.object({
  employerName: z.string({
    required_error: 'Please enter your Name',
  }),
  website: z.string({
    required_error: 'Please enter your website',
  }),
  location: locationSchema,
  companySize: optionSchema,
  email: z
    .string({
      required_error: 'Please enter your email',
    })
    .email({ message: 'Please enter a valid email address' }),
  phoneNumber: z.string({
    required_error: 'Please enter your phone number',
  }),
  // socialLinks: socialLinkSchema,
  about: z.string({
    required_error: 'Please enter about your company ',
  }),
  industry: optionSchema,
  socialLinks: z.object({
    linkedin: z.string().nullish(),
    facebook: z.string().nullish(),
    twitter: z.string().nullish(),
    instagram: z.string().nullish(),
    tiktok: z.string().nullish(),
    youtube: z.string().nullish(),
  }),
});

const permissionSchema = z.object({
  modifiers: z.object({
    create: z.boolean(),
    read: z.boolean(),
    update: z.boolean(),
    delete: z.boolean(),
  }),
});

export const accessControlRoleFormSchema = z.object({
  name: z.string().nonempty(),
  permission: z.object({
    positions: permissionSchema,
    bookmarks: permissionSchema,
    groups: permissionSchema,
    dashboard: permissionSchema,
    wallet: permissionSchema,
    jobs: permissionSchema,
    messages: permissionSchema,
    verifications: permissionSchema,
    team_management: permissionSchema,
    account_settings: permissionSchema,
  }),
});
