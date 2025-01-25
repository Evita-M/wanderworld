import { ExpeditionCommon } from "entities/expedition/model";

export type CreateExpedition = ExpeditionCommon;
export type EditExpedition = ExpeditionCommon;

export interface GenerateExpeditionRequestBody {
  name: string;
  countries: string[];
  languages: string[];
  activities: string[];
  groupSize: [number, number];
  tourDuration: [Date, Date];
  meetingDate: Date;
}

