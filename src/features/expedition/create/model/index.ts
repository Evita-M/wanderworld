import { Create, Edit } from "@/shared/types";
import { ExpeditionCommon } from "entities/expedition/model";


export type CreateExpedition = ExpeditionCommon & Create;
export type EditExpedition = ExpeditionCommon & Edit;

export interface GenerateExpeditionRequestBody {
  name: string;
  countries: string[];
  languages: string[];
  activities: string[];
  groupSize: [number, number];
  tourDuration: [Date, Date];
  meetingDate: Date;
}

