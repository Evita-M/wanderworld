import { Metadata } from 'next';
import PageContent from './page-content';
import { PageContainer } from '@/ui/core/layout';
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
