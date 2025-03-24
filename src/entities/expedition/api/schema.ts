import { z } from 'zod';

const COUNTRY_CODE_REGEX = /^[a-zA-Z]{2}$/;
const LANGUAGE_CODE_REGEX = /^[a-z]{2}$/;
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

export const countrySchema = z.object({
  id: z.string().uuid(),
  code: z.string().regex(COUNTRY_CODE_REGEX),
  name: z.string(),
});

export const languageSchema = z.object({
  id: z.string().uuid(),
  code: z.string().regex(LANGUAGE_CODE_REGEX),
  name: z.string(),
});

export const guideSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string().regex(PHONE_REGEX),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
});

export const createCountrySchema = countrySchema.omit({ id: true });
export const createLanguageSchema = languageSchema.omit({ id: true });

// Base schema with string dates for Redux store
export const expeditionSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().default(null),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  guide: guideSchema.nullable(),
  guideId: z.string().uuid().nullable(),
  status: z.enum(['PENDING', 'FINALIZED']),
  countries: z.array(countrySchema).min(1),
  languages: z.array(languageSchema).min(1),
  meetingDate: z.string(),
  minGroupSize: z.number().int().positive(),
  maxGroupSize: z.number().int().positive(),
  startDate: z.string(),
  endDate: z.string(),
  activities: z.array(z.string()).min(1),
});

export const createExpeditionSchema = expeditionSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    guide: true,
  })
  .extend({
    guideId: z.string().uuid().optional(),
  })
  .refine((data) => data.maxGroupSize >= data.minGroupSize, {
    message:
      'Maximum group size must be greater than or equal to minimum group size',
    path: ['maxGroupSize'],
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: 'End date must be after start date',
    path: ['endDate'],
  })
  .refine((data) => data.meetingDate <= data.startDate, {
    message: 'Meeting date must be before or on start date',
    path: ['meetingDate'],
  });

const updateExpeditionSchema = createExpeditionSchema;

export type ExpeditionSchema = z.infer<typeof expeditionSchema>;
export type CreateExpeditionSchema = z.infer<typeof createExpeditionSchema>;
export type UpdateExpeditionSchema = z.infer<typeof updateExpeditionSchema>;
