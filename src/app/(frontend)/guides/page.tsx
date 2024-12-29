import { Metadata } from 'next';
import PageContent from './PageContent';
import { PageContainer } from '@/components/core/PageContainer';
import { formatPageTitle } from '@/config/metadata';

export const metadata: Metadata = {
  title: formatPageTitle('Guides'),
  description:
    'Explore expert guides who can help you plan your next adventure.',
};

const GuidesPage = () => {
  return (
    <PageContainer>
      <PageContent />
    </PageContainer>
  );
};

export default GuidesPage;
