import type { Metadata } from 'next';
import { Stack } from '@mui/material';
import { Providers } from '@/providers/index';
import { ReactNode } from 'react';
import './globals.css';
import { museoModerno, notoSans } from '@/styles/fonts';
import { ThemeProvider } from '@mui/material';
import theme from '@/styles/theme';
import { Navbar } from '@/shared/ui/modules/navbar/navbar';
import { TopBar } from '@/shared/ui/modules/topbar/topbar';

export const metadata: Metadata = {
  title: {
    template: '%s | WanderWorld',
    default: 'WanderWorld',
  },
  openGraph: {
    siteName: 'Wander The World',
  },
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
  ],
};

const BAR_HEIGHT = '7.6rem';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <html
        lang='en'
        className='scroll-smooth antialiased'
        suppressHydrationWarning
      >
        <body className={`${notoSans.variable} ${museoModerno.variable}`}>
          <Providers>
            <Stack height='100%' direction='row'>
              <Navbar height={BAR_HEIGHT} />
              <Stack component='main' flex='1 1 100%'>
                <TopBar height={BAR_HEIGHT} />
                {children}
              </Stack>
            </Stack>
          </Providers>
        </body>
      </html>
    </ThemeProvider>
  );
}
