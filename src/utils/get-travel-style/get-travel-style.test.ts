import { TRAVEL_STYLES } from '@/lib/data/travel-styles';
import { getTravelStyle } from '.';

jest.mock('@/lib/data/travel-styles', () => ({
  TRAVEL_STYLES: {
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
  },
}));

describe('getTravelStyle', () => {
  it('should return INTIMATE for group sizes with max <= 4', () => {
    expect(getTravelStyle([1, 4])).toEqual(TRAVEL_STYLES.INTIMATE);
    expect(getTravelStyle([2, 3])).toEqual(TRAVEL_STYLES.INTIMATE);
  });

  it('should return SOCIAL for group sizes with max > 4 and <= 16', () => {
    expect(getTravelStyle([5, 16])).toEqual(TRAVEL_STYLES.SOCIAL);
    expect(getTravelStyle([10, 10])).toEqual(TRAVEL_STYLES.SOCIAL);
  });

  it('should return GROUP for group sizes with max > 16 and <= 26', () => {
    expect(getTravelStyle([17, 26])).toEqual(TRAVEL_STYLES.GROUP);
    expect(getTravelStyle([20, 25])).toEqual(TRAVEL_STYLES.GROUP);
  });

  it('should return COMMUNITY for group sizes with max > 26', () => {
    expect(getTravelStyle([27, 50])).toEqual(TRAVEL_STYLES.COMMUNITY);
    expect(getTravelStyle([30, 100])).toEqual(TRAVEL_STYLES.COMMUNITY);
  });

  it('should handle edge cases at the boundaries correctly', () => {
    expect(getTravelStyle([0, 4])).toEqual(TRAVEL_STYLES.INTIMATE);
    expect(getTravelStyle([5, 5])).toEqual(TRAVEL_STYLES.SOCIAL);
    expect(getTravelStyle([16, 16])).toEqual(TRAVEL_STYLES.SOCIAL);
    expect(getTravelStyle([17, 17])).toEqual(TRAVEL_STYLES.GROUP);
    expect(getTravelStyle([26, 26])).toEqual(TRAVEL_STYLES.GROUP);
  });
});
