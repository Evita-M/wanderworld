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

export type GuidePayload = Prisma.GuideGetPayload<{
  include: {
    languages: true;
    expeditions: true;
  };
}>;

export type CreateGuideRequestBody = z.infer<typeof apiGuideSchema>;
export type UpdateGuideRequestBody = Partial<CreateGuideRequestBody>;
