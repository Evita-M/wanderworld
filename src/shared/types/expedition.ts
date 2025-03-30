import { Country } from './country';
import { Language } from './language';

export interface Expedition {
  id: string;
  name: string;
  activities: string[];
  countries: Country[];
  languages: Language[];
  meetingDate: Date;
  minGroupSize: number;
  maxGroupSize: number;
  startDate: Date;
  endDate: Date;
  description?: string | null;
  guideId: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}
