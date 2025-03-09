import PageContent from './page-content';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guides',
  description:
    'Discover a wide range of guides, from adventure-packed treks to cultural tours and more.',
};

const GuidesPage = () => {
  return <PageContent />;
};

export default GuidesPage;
