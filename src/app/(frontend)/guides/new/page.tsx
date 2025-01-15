import { Metadata } from 'next';
import PageContent from './page-content';
import { PageContainer } from '@/ui/core/layout';
import { formatPageTitle } from '@/config/metadata';

export const metadata: Metadata = {
  title: formatPageTitle('New Guide'),
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
