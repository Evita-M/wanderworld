import { z } from 'zod';

export const guideFormSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  phoneNumber: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .regex(/^\+?[\d\s()-]{8,}$/, {
      message: 'Please enter a valid phone number (e.g. +1 (234) 567-8901)',
    }),
  description: z.string().optional(),
  avatar: z.string().nullable().optional(),
  email: z
    .string()
    .min(1, { message: 'Info email is required' })
    .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, {
      message: 'Please enter valid email',
    }),
  languages: z
    .array(z.object({ code: z.string(), name: z.string() }))
    .min(1, { message: 'Please select at least one language' }),
});

export type GuideFormSchema = z.infer<typeof guideFormSchema>;

export const defaultValues: GuideFormSchema = {
  lastName: '',
  firstName: '',
  phoneNumber: '',
  avatar: null,
  description: '',
  email: '',
  languages: [],
};
