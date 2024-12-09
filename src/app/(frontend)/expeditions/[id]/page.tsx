import { Metadata } from 'next';
import PageContent from './PageContent';
import { PageContainer } from '@/components/core/PageContainer';

export const metadata: Metadata = {
  title: 'Expedition Detail',
  description: 'Wander the World',
};

const ExpeditionDetailPage = () => {
  return (
    <PageContainer>
      <PageContent />
    </PageContainer>
  );
};

export default ExpeditionDetailPage;
