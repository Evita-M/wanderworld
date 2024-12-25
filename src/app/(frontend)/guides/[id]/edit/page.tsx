import { PageContainer } from '@/components/core/PageContainer';
import PageContent from './PageContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Guide',
  description: 'Wander the World',
};

export default function EditGuidePage() {
  return (
    <PageContainer maxWidth='md'>
      <PageContent />
    </PageContainer>
  );
}
