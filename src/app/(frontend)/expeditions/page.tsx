import { Metadata } from 'next';
import PageContent from './PageContent';
import { PageContainer } from '@/components/core/PageContainer';
import { routes } from '@/routes/index';
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
