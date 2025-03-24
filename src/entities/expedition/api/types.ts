import { Create } from '@mui/icons-material';

// TODO: update Activity type
export interface Country {
  id: string;
  code: string;
  name: string;
}

export interface Language {
  id: string;
  code: string;
  name: string;
}

export interface Expedition {
  id: string;
  name: string;
  description: string;
  activities: string[];
  createdAt: Date;
  updatedAt: Date;
  guideId?: string;
  countries: Country[];
  languages: Language[];
  meetingDate: Date;
  minGroupSize: number;
  maxGroupSize: number;
  startDate: Date;
  endDate: Date;
}

// API Request Types
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

export type UpdateExpeditionDTO = CreateExpeditionDTO & {
  id: string;
};

// API Tag Types
export type ExpeditionTag = {
  type: 'Expedition';
  id: string | 'LIST';
};
