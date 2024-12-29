import { PageContainer } from '@/components/core/PageContainer';
import PageContent from './PageContent';
import { Metadata } from 'next';
import { formatPageTitle } from '@/config/metadata';

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
