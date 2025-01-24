import { Metadata } from 'next';
import PageContent from './page-content';
import { formatPageTitle } from '@/shared/config/metadata';
import { PageContainer } from '@/shared/ui/core/layout';

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
