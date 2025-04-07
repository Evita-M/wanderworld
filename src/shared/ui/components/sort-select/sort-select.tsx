import { MenuItem, Select } from '@mui/material';

export type SortOrder = 'asc' | 'desc';

interface SortProps {
  sortOrder: SortOrder;
  onSortChange: (value: SortOrder) => void;
  labelAsc?: string;
  labelDesc?: string;
  size?: 'small' | 'medium';
}

export const SortSelect = ({
  sortOrder,
  onSortChange,
  labelAsc = 'Oldest First',
  labelDesc = 'Latest First',
  size = 'small',
}: SortProps) => {
  return (
    <Select
      value={sortOrder}
      size={size}
      onChange={(e) => onSortChange(e.target.value as SortOrder)}
    >
      <MenuItem value='desc'>{labelDesc}</MenuItem>
      <MenuItem value='asc'>{labelAsc}</MenuItem>
    </Select>
  );
};
