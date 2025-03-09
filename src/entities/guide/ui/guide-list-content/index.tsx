import { GuideList } from '@/entities/guide/ui/guide-list';
import { FC } from 'react';
import { Guide } from '../../model';
interface GuidesListContentProps {
  guides: Guide[];
}

export const GuidesListContent: FC<GuidesListContentProps> = ({ guides }) => (
  <div className='h-full'>
    <h2 className='sr-only'>Guides List</h2>
    <GuideList guides={guides} />
  </div>
);
