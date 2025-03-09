import PageContent from './page-content';
import { Metadata } from 'next';
import { PageContainer } from '@/shared/ui/core/layout';

export const metadata: Metadata = {
  title: '%s | My Site',
  description:
    'Edit and update your expedition with detailed information, activities, and recommendations.',
};

const EditExpeditionPage = () => {
  return (
    <PageContainer>
      <PageContent />
    </PageContainer>
  );
};

export default EditExpeditionPage;
