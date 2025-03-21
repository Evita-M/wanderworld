export interface Guide {
  id: number;
  name: string;
  specialties: string[];
  rating: number;
  yearsOfExperience: number;
}

export type Expedition = {
  id: number;
  name: string;
  description?: string;
  activities: string[];
  countries: { id: string; code: string; name: string }[];
  languages: { id: string; code: string; name: string }[];
  meetingDate: string;
  minGroupSize: number;
  maxGroupSize: number;
  startDate: string;
  endDate: string;
  guide: { id: string };
  status: string;
};
