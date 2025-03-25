import { Country } from './Country';
import { Language } from './Language';

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
  description?: string;
  guideId?: string;
  createdAt: Date;
  updatedAt?: Date;
}
