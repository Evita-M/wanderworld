export interface CreateExpeditionDTO {
  name: string;
  description?: string;
  activities: string[];
  guideId?: string;
  countries: { code: string; name: string }[];
  languages: { code: string; name: string }[];
  meetingDate: Date;
  minGroupSize: number;
  maxGroupSize: number;
  startDate: Date;
  endDate: Date;
}

export type UpdateExpeditionDTO = CreateExpeditionDTO;

export type ExpeditionTag = {
  type: 'Expedition';
  id: string | 'LIST';
};
