import { Prisma, Guide as PrismaGuide } from '@prisma/client';

export type Guide = PrismaGuide;
export type GuideWithExpeditions = Prisma.GuideGetPayload<{
  include: { expeditions: true };
}>;
