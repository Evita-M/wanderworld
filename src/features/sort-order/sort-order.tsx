import { MenuItem, Select } from '@mui/material';

interface SortProps {
  sortOrder: 'asc' | 'desc';
  onSortChange: (value: 'asc' | 'desc') => void;
  labelAsc?: string;
  labelDesc?: string;
  size?: 'small' | 'medium';
}

export const SortOrder = ({
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
      onChange={(e) => onSortChange(e.target.value as 'asc' | 'desc')}
    >
      <MenuItem value='desc'>{labelDesc}</MenuItem>
      <MenuItem value='asc'>{labelAsc}</MenuItem>
    </Select>
  );
};
