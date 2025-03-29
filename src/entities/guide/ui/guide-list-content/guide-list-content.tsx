import { FC } from 'react';
import { Guide } from '@/shared/types/guide';
import { GuideList } from '@/widgets/guide-list/ui/guide-list';
interface GuidesListContentProps {
  guides: Guide[];
}

export const GuidesListContent: FC<GuidesListContentProps> = ({ guides }) => (
  <div className='h-full'>
    <h2 className='sr-only'>Guides List</h2>
    <GuideList guides={guides} />
  </div>
);
