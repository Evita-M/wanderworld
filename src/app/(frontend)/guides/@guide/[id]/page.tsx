import { Metadata } from 'next';
import GuidePageContent from './page-content';

export const metadata: Metadata = {
  title: 'Guide Detail',
  description: 'Find out more about the guide',
};

export default function GuidePage() {
  return <GuidePageContent />;
}
