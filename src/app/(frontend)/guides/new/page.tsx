import { Metadata } from 'next';
import PageContent from './PageContent';
import { PageContainer } from '@/components/core/PageContainer';

export const metadata: Metadata = {
  title: 'New Guide',
  description: 'Wander the World',
};

const NewGuidePage = () => {
  return (
    <PageContainer>
      <PageContent />
    </PageContainer>
  );
};

export default NewGuidePage;
