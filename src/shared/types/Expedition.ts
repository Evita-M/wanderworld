import { Country } from './Country';
import { Language } from './Language';

export interface Expedition {
  id: string;
  name: string;
  description: string | null;
  countries: Country[];
  meetingDate: Date;
  startDate: Date;
  endDate: Date;
  minGroupSize: number;
  maxGroupSize: number;
  guideId: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  languages: Language[];
  activities: string[];
}
