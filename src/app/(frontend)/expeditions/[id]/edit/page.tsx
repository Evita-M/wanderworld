import PageContent from './page-content';
import { Metadata } from 'next';
import { PageContainer } from '@/shared/ui/core/layout/page-container';

export const metadata: Metadata = {
  title: 'Edit Expedition',
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
