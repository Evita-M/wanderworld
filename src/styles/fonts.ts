import { MuseoModerno, Noto_Sans } from 'next/font/google';

export const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--noto-sans',
  display: 'swap',
  preload: true,
});

export const museoModerno = MuseoModerno({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--museo-moderno',
  display: 'swap',
  preload: true,
});
