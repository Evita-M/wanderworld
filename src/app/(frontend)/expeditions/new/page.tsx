import { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'Create Expedition',
  description: 'Wander the World',
};

const CreateExpeditionPage = () => {
  return <PageContent />;
};

export default CreateExpeditionPage;
