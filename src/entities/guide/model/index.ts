import { Guide } from '@/shared/types/guide';

export type GuideCommon = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  description: string;
  avatar: string;
  languages: string[];
};
