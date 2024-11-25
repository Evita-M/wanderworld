export const getActivitiesNames = (
  activityIds: string[],
  activities: { id: string; label: string }[]
): string => {
  return activityIds
    .map((activityId) => {
      const activity = activities.find(
        (activity) => activity.id === activityId
      );
      return activity ? activity.label : null;
    })
    .join(', ');
};
