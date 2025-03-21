import { TravelStyleType } from '../enums/travel-style';

export type TravelStyle = {
  style: string;
  description: string;
};

export const TRAVEL_STYLES = {
  INTIMATE: { style: 'Intimate', description: 'Small and private group.' },
  SOCIAL: {
    style: 'Social',
    description: 'Medium-sized group, more social.',
  },
  GROUP: { style: 'Group', description: 'Large group of travelers.' },
  COMMUNITY: {
    style: 'Community',
    description: 'Very large community of travelers.',
  },
} as const;
