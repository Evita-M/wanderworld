export const getNames = (
  ids: string[],
  items: { id: string; label: string }[],
  fallbackToId = false
): string => {
  return ids
    .map((id) => {
      const item = items.find((item) => item.id === id);
      return item ? item.label : fallbackToId ? id : null;
    })
    .filter(Boolean)
    .join(', ');
};
