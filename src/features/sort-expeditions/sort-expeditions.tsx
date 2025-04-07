import { FC, ReactNode, useMemo, useState } from 'react';
import {
  SortOrder,
  SortSelect,
} from '@/shared/ui/components/sort-select/sort-select';
import { sortByDate } from '@/utils/sort-by-date';
import { Expedition } from '@/shared/types/expedition';
import { Box, Stack } from '@mui/material';

interface SortExpeditionsProps {
  title?: ReactNode;
  expeditions: Expedition[];
  children: (sortedExpeditions: Expedition[]) => ReactNode;
}

export const SortExpeditions: FC<SortExpeditionsProps> = ({
  title,
  expeditions,
  children,
}) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const sortedExpeditions = useMemo(() => {
    if (!expeditions?.length) return [];
    return sortByDate([...expeditions], 'startDate', sortOrder);
  }, [expeditions, sortOrder]);

  return (
    <>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        {title}
        {expeditions?.length > 1 && (
          <Box ml='auto'>
            <SortSelect sortOrder={sortOrder} onSortChange={setSortOrder} />
          </Box>
        )}
      </Stack>
      {children(sortedExpeditions)}
    </>
  );
};
