import { Image } from '@/components/core/ResponsiveImage';
import { Hero } from '@/modules/hero';
import { Stack } from '@mui/material';
import { FC } from 'react';

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

const Home: FC = () => (
  <Stack
    direction='row'
    justifyContent='center'
    alignItems='center'
    height='100%'
  >
    <Hero images={heroImages} />
  </Stack>
);

export default Home;
