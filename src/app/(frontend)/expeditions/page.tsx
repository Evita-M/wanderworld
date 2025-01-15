import { Metadata } from 'next';
import PageContent from './page-content';
import { PageContainer } from '@/ui/core/layout';
import { formatPageTitle } from '@/config/metadata';

export const metadata: Metadata = {
  title: formatPageTitle('Expeditions'),
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
