import { Metadata } from 'next';
import PageContent from './PageContent';
import { PageContainer } from '@/components/core/PageContainer';
import { routes } from '@/routes/index';

export const metadata: Metadata = {
  title: 'About',
  description: 'Wander the World',
};

const About = () => {
  <PageContainer>
    <PageContent />
  </PageContainer>;
};

export default About;
