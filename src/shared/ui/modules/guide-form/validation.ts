import { patterns } from '@/utils/patterns';
import { z } from 'zod';

export const guideSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  phoneNumber: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: 'Please enter a valid phone number (e.g., +1234567890)',
    }),
  description: z.string().optional(),
  avatar: z.string().default(''),
  email: z
    .string()
    .min(1, { message: 'Info email is required' })
    .refine((email) => patterns.email.test(email), {
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
