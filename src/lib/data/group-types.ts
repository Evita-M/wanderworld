import { GroupType } from '../enums/group-type';

export const GROUP_TYPES = {
  [GroupType.PRIVATE]: {
    type: 'Private',
    getDescription: (min: number, max: number) =>
      `Private experience\n Min ${min}, max ${max} travelers`,
  },
  [GroupType.SMALL]: {
    type: 'Small Group',
    getDescription: (min: number, max: number) =>
      `Small group experience\n Min ${min}, max ${max} travelers`,
  },
  [GroupType.MEDIUM]: {
    type: 'Medium Group',
    getDescription: (min: number, max: number) =>
      `Medium group experience\n Min ${min}, max ${max} travelers`,
  },
  [GroupType.LARGE]: {
    type: 'Large Group',
    getDescription: (min: number, max: number) =>
      `Large group experience\n Min ${min}, max ${max} travelers`,
  },
};
