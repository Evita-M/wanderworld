import { PageContainer } from '@/ui/core/layout';
import { Image } from '@/ui/core/layout';
import { Hero } from '@/modules/hero';

const heroImages: Image[] = [
  {
    src: '/hero_1.jpg',
    width: 1920,
    height: 1281,
    alt: 'example',
  },
  {
    src: '/hero_2.jpg',
    width: 1920,
    height: 2600,
    alt: 'example',
  },
];

export default function Home() {
  return (
    <PageContainer maxWidth='100%'>
      <Hero images={heroImages} />
    </PageContainer>
  );
}
