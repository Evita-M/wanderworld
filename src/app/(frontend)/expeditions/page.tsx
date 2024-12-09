import { Metadata } from 'next';
import PageContent from './PageContent';
import { PageContainer } from '@/components/core/PageContainer';
import { routes } from '@/routes/index';

export const metadata: Metadata = {
  title: 'Expeditions',
};

export default function ExpeditionsPage() {
  return (
    <PageContainer>
      <PageContent />
    </PageContainer>
  );
}
