import { GROUP_TYPES } from '@/lib/data/group-types';

export const getGroupType = (
  groupSize: [number, number]
): { type: string; description: string } => {
  const [min, max] = groupSize;

  switch (true) {
    case max <= 4:
      return {
        type: GROUP_TYPES.PRIVATE.type,
        description: GROUP_TYPES.PRIVATE.getDescription(min, max),
      };
    case max <= 16:
      return {
        type: GROUP_TYPES.SMALL.type,
        description: GROUP_TYPES.SMALL.getDescription(min, max),
      };
    case max <= 26:
      return {
        type: GROUP_TYPES.MEDIUM.type,
        description: GROUP_TYPES.MEDIUM.getDescription(min, max),
      };
    default:
      return {
        type: GROUP_TYPES.LARGE.type,
        description: GROUP_TYPES.LARGE.getDescription(min, max),
      };
  }
};
