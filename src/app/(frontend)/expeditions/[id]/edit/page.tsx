import PageContent from './page-content';
import { Metadata } from 'next';
import { formatPageTitle } from '@/config/metadata';
import { PageContainer } from '@/ui/core/layout';

export const metadata: Metadata = {
  title: formatPageTitle('Edit Expedition'),
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
