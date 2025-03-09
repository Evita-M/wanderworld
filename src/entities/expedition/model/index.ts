import { Prisma, Expedition as PrismaExpedition } from '@prisma/client';

export type ExpeditionCommon = {
  email: string;
  name: string;
  guideFirstName: string;
  guideLastName: string;
  countries: string[];
  gender: string;
  languages: string[];
  activities: string[];
  meetingDateTime: string;
  tourDuration: [string, string];
  groupSize: [number, number];
  hasParticipants: boolean;
  participants: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  }[];
};

export type Expedition = PrismaExpedition;

export type ExpeditionWithGuideAndParticipants = Prisma.ExpeditionGetPayload<{
  include: {
    guide: true;
    participants: true;
  };
}>;

export type ExpeditionResponse = ExpeditionCommon;
