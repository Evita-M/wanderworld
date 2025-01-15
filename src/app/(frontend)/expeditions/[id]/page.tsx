import { Metadata } from 'next';
import PageContent from './page-content';
import { PageContainer } from '@/ui/core/layout';
import { formatPageTitle } from '@/config/metadata';

export const metadata: Metadata = {
  title: formatPageTitle('Expedition Detail'),
  description:
    'Explore the details of this amazing expedition, including activities, locations, and more.',
};

const ExpeditionDetailPage = () => {
  return (
    <PageContainer>
      <PageContent />
    </PageContainer>
  );
};

export default ExpeditionDetailPage;
