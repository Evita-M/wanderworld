import { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'Expedition Detail',
  description: 'Wander the World',
};

const ExpeditionDetailPage = () => {
  return <PageContent />;
};

export default ExpeditionDetailPage;
