import { getNames } from './index';

describe('getNames', () => {
  const mockItems = [
    { id: '1', label: 'John' },
    { id: '2', label: 'Jane' },
    { id: '3', label: 'Bob' },
  ];

  test('returns comma-separated labels for matching ids', () => {
    const result = getNames(['1', '2'], mockItems);
    expect(result).toBe('John, Jane');
  });

  test('returns empty string for empty ids array', () => {
    const result = getNames([], mockItems);
    expect(result).toBe('');
  });

  test('skips non-matching ids by default', () => {
    const result = getNames(['1', '999', '2'], mockItems);
    expect(result).toBe('John, Jane');
  });

  test('uses id as fallback when fallbackToId is true', () => {
    const result = getNames(['1', '999', '2'], mockItems, true);
    expect(result).toBe('John, 999, Jane');
  });
});
