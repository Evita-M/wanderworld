import { patterns } from '@/utils/patterns';
import { z } from 'zod';

export const guideSchema = z.object({
  firstName: z.string().min(1, { message: 'Guide first name is required' }),
  lastName: z.string().min(1, { message: 'Guide last name is required' }),
  phoneNumber: z.string().min(1, { message: 'Guide phone number is required' }),
  description: z.string().optional(),
  avatar: z
    .string()
    .default(
      'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/ebd2a9c7-1cc5-4524-b05c-6623d8dca825/96f7fb9a-ac51-4b81-adef-9fcf6bd87d8d.png'
    ),
  email: z
    .string()
    .min(1, { message: 'Info email is required' })
    .refine((email) => patterns.email.test(email), {
      message: 'Please enter valid email',
    }),
  languages: z.array(z.string()),
});

export type GuideSchema = z.infer<typeof guideSchema>;

export const defaultValues: GuideSchema = {
  lastName: '',
  firstName: '',
  phoneNumber: '',
  avatar: '',
  description: '',
  email: '',
  languages: [],
};
