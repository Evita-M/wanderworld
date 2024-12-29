import { TravelStyleType } from '../enums/travel-style';

export const TRAVEL_STYLES = {
  [TravelStyleType.INTIMATE]: {
    style: 'Intimate Explorer',
    description:
      'Personalized, intimate adventures with maximum flexibility and customization options.',
  },
  [TravelStyleType.SOCIAL]: {
    style: 'Social Wanderer',
    description:
      'Perfect blend of social interaction and personal space, ideal for making new friends while traveling.',
  },
  [TravelStyleType.GROUP]: {
    style: 'Group Adventurer',
    description:
      'Dynamic group experiences with diverse perspectives and shared discoveries.',
  },
  [TravelStyleType.COMMUNITY]: {
    style: 'Community Voyager',
    description:
      'Large-scale adventures that bring together travelers from all walks of life for shared experiences.',
  },
};
