import { Metadata } from 'next';
import PageContent from './page-content';
import { PageContainer } from '@/shared/ui/core/layout/page-container';

export const metadata: Metadata = {
  title: 'New Guide',
  description:
    'Create a new guide and share your travel experiences with the world.',
};

const NewGuidePage = () => {
  return (
    <PageContainer>
      <PageContent />
    </PageContainer>
  );
};

export default NewGuidePage;
