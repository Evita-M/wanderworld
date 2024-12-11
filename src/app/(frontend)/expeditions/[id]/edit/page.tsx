import { PageContainer } from '@/components/core/PageContainer';
import PageContent from './PageContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Expedition',
  description: 'Wander the World',
};

export default function EditExpeditionPage() {
  return (
    <PageContainer>
      <PageContent />
    </PageContainer>
  );
}
