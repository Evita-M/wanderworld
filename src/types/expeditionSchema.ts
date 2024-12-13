import { z } from 'zod';

export const patterns = {
  email: /^[^@]+@[^@]+.[^@]+$/,
};

export const expeditionSchema = z.object({
  name: z.string().min(1, { message: 'Please enter an expedition name' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' }),
  countries: z
    .array(z.string())
    .min(1, { message: 'Please select at least one country' })
    .max(5, { message: 'You can select up to 5 countries' }),
  languages: z
    .array(z.string())
    .min(1, { message: 'Please select at least one language' }),
  guide: z.string().uuid().optional(),
  activities: z
    .array(z.string())
    .min(1, { message: 'Please select at least one activity' }),
  meetingDate: z.date({
    required_error: 'Please select a meeting date',
    invalid_type_error: 'Please enter a valid date',
  }),
  tourDuration: z
    .array(z.date())
    .min(2, { message: 'Please select both start and end dates' })
    .max(2, { message: 'Please select both start and end dates' })
    .refine((dates) => dates.length === 2 && dates[1] > dates[0], {
      message: 'End date must be after the start date',
    }),
  groupSize: z
    .array(z.number())
    .min(1, { message: 'Please specify the group size range' })
    .max(40, { message: 'Group size cannot exceed 40 participants' }),
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
