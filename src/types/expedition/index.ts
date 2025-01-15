import { Prisma, Expedition as PrismaExpedition } from '@prisma/client';

export type Expedition = PrismaExpedition;
export type ExpeditionWithGuideAndParticipants = Prisma.ExpeditionGetPayload<{
  include: {
    guide: true;
    participants: true;
  };
}>;
