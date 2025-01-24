import { Metadata } from 'next';
import PageContent from './page-content';
import { formatPageTitle } from '@/shared/config/metadata';
import { PageContainer } from '@/shared/ui/core/layout';


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
