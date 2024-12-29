import { Metadata } from 'next';
import PageContent from './PageContent';
import { PageContainer } from '@/components/core/PageContainer';
import { formatPageTitle } from '@/config/metadata';

export const metadata: Metadata = {
  title: formatPageTitle('Create Expedition'),
  description:
    'Create a new expedition and share your adventure with the world.',
};

const CreateExpeditionPage = () => {
  return (
    <PageContainer>
      <PageContent />
    </PageContainer>
  );
};

export default CreateExpeditionPage;
