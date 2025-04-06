import { PageContainer } from '@/shared/ui/core/layout/page-container';
import PageContent from './page-content';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Guide',
  description:
    'Edit and update your travel guide with detailed information, activities, and recommendations.',
};

const EditGuidePage = () => {
  return (
    <PageContainer>
      <PageContent />
    </PageContainer>
  );
};

export default EditGuidePage;
