import { Metadata } from 'next';
import PageContent from './page-content';
import { PageContainer } from '@/shared/ui/core/layout/page-container';

export const metadata: Metadata = {
  title: 'New Expedition',
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
