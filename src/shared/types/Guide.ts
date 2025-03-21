import { Expedition } from './Expedition';
import { Language } from './Language';

export type Guide = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  description: string;
  avatar: string;
  expeditions: Expedition[];
  languages: Language[];
};
