import { z } from 'zod';

export const guideSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  phoneNumber: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .regex(/^\+?[\d\s()-]{8,}$/, {
      message: 'Please enter a valid phone number (e.g. +1 (234) 567-8901)',
    }),
  description: z.string().optional(),
  avatar: z.string().default(''),
  email: z
    .string()
    .min(1, { message: 'Info email is required' })
    .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, {
      message: 'Please enter valid email',
    }),
  languages: z.array(z.string()),
});

export type GuideSchema = z.infer<typeof guideSchema>;

export const initialValues: GuideSchema = {
  lastName: '',
  firstName: '',
  phoneNumber: '',
  avatar: '',
  description: '',
  email: '',
  languages: [],
};
