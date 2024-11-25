import { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'About',
  description: 'Wander the World',
};

const About = () => {
  return <PageContent />;
};

export default About;
