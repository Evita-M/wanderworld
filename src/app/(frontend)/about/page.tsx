import { Metadata } from 'next';
import { PageContainer } from '@/components/core/PageContainer';
import PageContent from './PageContent';
import { formatPageTitle } from '@/config/metadata';

export const metadata: Metadata = {
  title: formatPageTitle('About Us'),
  description:
    'Learn about our mission and our commitment to authentic travel experiences.',
};

const AboutPage = () => {
  return (
    <PageContainer>
      <PageContent />
    </PageContainer>
  );
};

export default AboutPage;
