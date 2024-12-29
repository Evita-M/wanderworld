import { TRAVEL_STYLES } from '@/lib/data/travel-styles';

export const getTravelStyle = (
  groupSize: [number, number]
): { style: string; description: string } => {
  const [, max] = groupSize;

  switch (true) {
    case max <= 4:
      return TRAVEL_STYLES.INTIMATE;
    case max <= 16:
      return TRAVEL_STYLES.SOCIAL;
    case max <= 26:
      return TRAVEL_STYLES.GROUP;
    default:
      return TRAVEL_STYLES.COMMUNITY;
  }
};
