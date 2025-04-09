import { Expedition } from './expedition';
import { Language } from './language';

export type Guide = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  description?: string | null;
  avatar?: string | null;
  expeditions: Expedition[];
  languages: Language[];
};
