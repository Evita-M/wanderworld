type SortOrder = 'asc' | 'desc';

export function sortByDate<T extends Record<string, any>>(
  array: T[],
  dateKey: keyof T,
  order: SortOrder = 'desc'
): T[] {
  return [...array].sort((a, b) => {
    const dateA = new Date(a[dateKey]);
    const dateB = new Date(b[dateKey]);

    // Throw an error if the date is invalid
    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      throw new Error('Invalid date format');
    }

    return order === 'asc'
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });
}
