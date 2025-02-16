import { z } from 'zod';

import { optionsService } from '@/services';

export const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  __isNew__: z.boolean().optional(),
});

export const strongPasswordSchema = z
  .string()
  .min(8, 'Must be at least 8 characters in length')
  .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
  .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
  .regex(new RegExp('.*\\d.*'), 'One number')
  .regex(
    new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
    'One special character'
  );

export const locationSchema = z.object({
  country: optionSchema,
  state: optionSchema,
  city: optionSchema,
  zipCode: z.string({
    required_error: 'Please enter your zip code',
  }),
  address: z.string({
    required_error: 'Please enter your address',
  }),
});

const urlValidation = (message: string) =>
  z
    .string()
    .optional()
    .refine(
      (val) =>
        val === undefined || val === '' || /^https?:\/\/.+\..+$/.test(val),
      { message }
    );

export const socialLinkSchema = z.object({
  facebook: urlValidation('Please enter a valid facebook url'),
  twitter: urlValidation('Please enter a valid twitter url'),
  instagram: urlValidation('Please enter a valid instagram url'),
  linkedin: urlValidation('Please enter a valid linkedin url'),
  tiktok: urlValidation('Please enter a valid tiktok url'),
  youtube: urlValidation('Please enter a valid youtube url'),
});

export const professionEmailSchema = z
  .string()
  .min(1, { message: 'This field has to be filled.' })
  .email('This is not a valid email.')
  .refine(
    async (value) => {
      // Add Sleep timeOut to debounce when the value Change Before calling the unacceptedEmailProvidersFn Function
      // await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await optionsService.unacceptedEmailProvidersFn();
      const excludedDomains = response?.data?.providers;

      const domain = value.split('@')[1];

      return !excludedDomains.includes(domain);
    },
    {
      message: 'Please provide your professional email address',
    }
  );
