import { sortByDate } from '.';

type TestItem = {
  id: number;
  date: string;
};

describe('sortByDate', () => {
  const mockArray: TestItem[] = [
    { id: 1, date: '2025-01-01T12:00:00Z' },
    { id: 2, date: '2023-06-15T08:30:00Z' },
    { id: 3, date: '2024-03-10T15:45:00Z' },
  ];

  it('should sort the array in descending order by default', () => {
    const sorted = sortByDate(mockArray, 'date');
    expect(sorted).toEqual([
      { id: 1, date: '2025-01-01T12:00:00Z' },
      { id: 3, date: '2024-03-10T15:45:00Z' },
      { id: 2, date: '2023-06-15T08:30:00Z' },
    ]);
  });

  it('should sort the array in ascending order when specified', () => {
    const sorted = sortByDate(mockArray, 'date', 'asc');
    expect(sorted).toEqual([
      { id: 2, date: '2023-06-15T08:30:00Z' },
      { id: 3, date: '2024-03-10T15:45:00Z' },
      { id: 1, date: '2025-01-01T12:00:00Z' },
    ]);
  });

  it('should not mutate the original array', () => {
    const originalArray = [...mockArray];
    sortByDate(mockArray, 'date');
    expect(mockArray).toEqual(originalArray);
  });

  it('should handle an empty array', () => {
    const sorted = sortByDate([], 'date');
    expect(sorted).toEqual([]);
  });

  it('should handle arrays with a single element', () => {
    const singleElementArray = [{ id: 1, date: '2025-01-01T12:00:00Z' }];
    const sorted = sortByDate(singleElementArray, 'date');
    expect(sorted).toEqual(singleElementArray);
  });

  it('should throw an error if the date property is not a valid date', () => {
    const invalidArray = [
      { id: 1, date: 'invalid-date' },
      { id: 2, date: '2023-06-15T08:30:00Z' },
    ];
    expect(() => sortByDate(invalidArray, 'date')).toThrow();
  });

  it('should sort correctly when all dates are the same', () => {
    const sameDateArray = [
      { id: 1, date: '2025-01-01T12:00:00Z' },
      { id: 2, date: '2025-01-01T12:00:00Z' },
      { id: 3, date: '2025-01-01T12:00:00Z' },
    ];
    const sorted = sortByDate(sameDateArray, 'date');
    expect(sorted).toEqual(sameDateArray);
  });
});
