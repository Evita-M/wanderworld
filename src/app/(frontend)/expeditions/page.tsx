import { Metadata } from 'next';
import PageContent from './page-content';
import { PageContainer } from '@/shared/ui/core/layout';

export const metadata: Metadata = {
  title: '%s | My Site',
  description:
    'Discover a wide range of expeditions, from adventure-packed treks to cultural tours and more.',
};

const ExpeditionsPage = () => {
  return (
    <PageContainer>
      <PageContent />
    </PageContainer>
  );
};

export default ExpeditionsPage;
