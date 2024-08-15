import { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'Expeditions',
  description: 'An amazing app about expeditions',
};

const ExpeditionPage = () => {
  return <PageContent />;
};

export default ExpeditionPage;
