import { GROUP_TYPES } from '@/lib/data/group-types';
import { getGroupType } from '.';

describe('getGroupType', () => {
  test('returns PRIVATE for groups up to 4 people', () => {
    const result = getGroupType([2, 4]);
    expect(result).toEqual({
      type: GROUP_TYPES.PRIVATE.type,
      description: GROUP_TYPES.PRIVATE.getDescription(2, 4),
    });
  });

  test('returns SMALL for groups up to 16 people', () => {
    const result = getGroupType([5, 16]);
    expect(result).toEqual({
      type: GROUP_TYPES.SMALL.type,
      description: GROUP_TYPES.SMALL.getDescription(5, 16),
    });
  });

  test('returns MEDIUM for groups up to 26 people', () => {
    const result = getGroupType([17, 26]);
    expect(result).toEqual({
      type: GROUP_TYPES.MEDIUM.type,
      description: GROUP_TYPES.MEDIUM.getDescription(17, 26),
    });
  });

  test('returns LARGE for groups larger than 26 people', () => {
    const result = getGroupType([27, 50]);
    expect(result).toEqual({
      type: GROUP_TYPES.LARGE.type,
      description: GROUP_TYPES.LARGE.getDescription(27, 50),
    });
  });
});
