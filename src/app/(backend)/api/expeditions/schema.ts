import { Prisma } from '@prisma/client';
import { z } from 'zod';

export const apiExpeditionSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  activities: z.array(z.string()).min(1),
  guideId: z.string().optional(),
  countries: z
    .array(
      z.object({
        code: z.string(),
        name: z.string(),
      })
    )
    .min(1),
  languages: z
    .array(
      z.object({
        code: z.string(),
        name: z.string(),
      })
    )
    .min(1),
  meetingDate: z.coerce.date(),
  minGroupSize: z.number().min(1),
  maxGroupSize: z.number().min(1),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

export type RequestParams = {
  expeditionId: string;
};

export type GetExpeditionPayload = Prisma.ExpeditionGetPayload<{
  include: {
    countries: true;
    languages: true;
    guide: true;
  };
}>;

export type ExpeditionRequestBody = {
  countries: { code: string; name: string }[];
  languages: { code: string; name: string }[];
  guideId: string | undefined;
} & Omit<Prisma.ExpeditionCreateInput, 'countries' | 'languages' | 'guide'>;

export type UpdateExpeditionRequestBody = ExpeditionRequestBody;

export type CreateExpeditionRequestBody = ExpeditionRequestBody;
