import { Prisma } from '@prisma/client';
import { z } from 'zod';

export const apiGuideSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(1),
  description: z.string().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.string(),
  languages: z
    .array(
      z.object({
        code: z.string(),
        name: z.string(),
      })
    )
    .min(1),
});

export type RequestParams = {
  guideId: string;
};

export type GetGuidePayload = Prisma.GuideGetPayload<{
  include: {
    languages: true;
    expeditions: true;
  };
}>;

type CreateGuideInput = {
  languages: { code: string; name: string }[];
} & Omit<Prisma.GuideCreateInput, 'languages'>;

type UpdateGuideInput = {
  languages: { code: string; name: string }[];
} & Omit<Prisma.GuideUpdateInput, 'languages'>;

export type CreateGuideRequestBody = CreateGuideInput;

export type UpdateGuideRequestBody = UpdateGuideInput;
