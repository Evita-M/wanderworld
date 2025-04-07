import { FC, ReactNode, useMemo, useState } from 'react';
import { SortSelect } from '@/shared/ui/components/sort-select/sort-select';
import { sortByDate } from '@/utils/sort-by-date';
import { ExpeditionPayload } from '@/app/(backend)/api/expeditions/schema';

interface SortExpeditionsProps {
  expeditions: ExpeditionPayload[];
  children: (sortedExpeditions: ExpeditionPayload[]) => ReactNode;
}

export const SortExpeditions: FC<SortExpeditionsProps> = ({
  expeditions,
  children,
}) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedExpeditions = useMemo(() => {
    if (!expeditions?.length) return [];
    return sortByDate([...expeditions], 'startDate', sortOrder);
  }, [expeditions, sortOrder]);

  return (
    <>
      <div className='mb-4 flex justify-end'>
        <SortSelect sortOrder={sortOrder} onSortChange={setSortOrder} />
      </div>
      {children(sortedExpeditions)}
    </>
  );
};
