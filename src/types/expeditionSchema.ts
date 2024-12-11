import { z } from 'zod';

export const patterns = {
  email: /^[^@]+@[^@]+.[^@]+$/,
};

export const expeditionSchema = z.object({
  name: z.string().min(1, { message: 'Expedition name is required' }),
  description: z
    .string()
    .min(10, { message: 'Desctiption should be min 10 characters' }),
  countries: z
    .array(z.string())
    .min(1, { message: 'At least one state is required' })
    .max(2, { message: 'Max 2 selected states' }),
  languages: z
    .array(z.string())
    .min(1, { message: 'At least one language is required' }),
  guide: z.string().optional(),
  activities: z.array(z.string()).min(1, { message: 'Min 1 selected skill' }),
  meetingDate: z.date(),
  tourDuration: z
    .array(z.date())
    .min(2, { message: 'You must provide exactly two dates' })
    .max(2, { message: 'You must provide exactly two dates' })
    .refine((dates) => dates.length === 2 && dates[1] > dates[0], {
      message: 'The end date must be later than the start date',
    }),
  groupSize: z.array(z.number()).min(1).max(40),
});

export type ExpeditionSchema = z.infer<typeof expeditionSchema>;

export const defaultValues: ExpeditionSchema = {
  name: '',
  description: '',
  countries: [],
  guide: '',
  languages: [],
  activities: [],
  meetingDate: new Date(),
  tourDuration: [new Date(), new Date()],
  groupSize: [0, 0],
};
