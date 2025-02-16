import { z } from 'zod';

import {
  locationSchema,
  optionSchema,
  professionEmailSchema,
  socialLinkSchema,
} from '../shared/sharedValidation';

export const universityDetailsSchema = z.object({
  institutionName: optionSchema,
  website: z.string({
    required_error: 'Please enter your website',
  }),
  location: locationSchema,
  email: professionEmailSchema,
  phoneNumber: z.string({
    required_error: 'Please enter your phone number',
  }),
  phoneCode: z.object({
    value: z.string(),
    label: z.string(),
  }),
  // socialLinks: socialLinkSchema,
  about: z.string({
    required_error: 'Please enter about your institution ',
  }),
  qualificationsOffered: z.array(z.string()).optional(),
});

export const filterUniversityStudentAlumniSchema = z.object({
  q: z.string().optional(),
  classYears: z.array(optionSchema).optional(),
  searchBy: z
    .string({
      required_error: 'Please enter student or alumni name',
    })
    .optional(),
  filterBy: z.string().optional(),
  disciplines: z.array(optionSchema).optional(),
  jobTitles: z.array(optionSchema).optional(),
  industries: z.array(optionSchema).optional(),
  employers: z.array(optionSchema).optional(),
  credentials: z.array(optionSchema).optional(),
  location: z
    .object({
      country: optionSchema,
      state: optionSchema,
      city: optionSchema,
    })
    .optional(),
  distance: z.array(z.number()).optional(),
  employmentStatus: z.array(optionSchema).optional(),
  jobTypes: z.array(optionSchema).optional(),
  experienceLevel: z.array(optionSchema).optional(),
  educationLevel: z.array(optionSchema).optional(),
  companySizes: z.array(optionSchema).optional(),
  workspaceType: z.array(optionSchema).optional(),
  salary: z.array(z.number()).optional(),
  program: optionSchema,
  employedDate: z
    .object({
      startDate: z.any().optional(),
      endDate: z.any().optional(),
    })
    .optional(),
  institutions: z.array(optionSchema).optional().optional(),
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
    events: permissionSchema,
    campaigns: permissionSchema,
    resources: permissionSchema,
    projects: permissionSchema,
    appointments: permissionSchema,
    'university-updates': permissionSchema,
    messages: permissionSchema,
    staff: permissionSchema,
    students: permissionSchema,
    'school-profile': permissionSchema,
  }),
});
