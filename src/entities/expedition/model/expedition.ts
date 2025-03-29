import { Prisma } from '@prisma/client';

export type Expedition = Prisma.ExpeditionGetPayload<{
  include: {
    guide: true;
    countries: true;
    languages: true;
  };
}>;
