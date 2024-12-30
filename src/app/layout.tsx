import type { Metadata } from 'next';
import { Stack } from '@mui/material';
import { Providers } from '@/providers/index';
import { Header } from '@/modules/Header';
import { ReactNode } from 'react';
import './globals.css';
import { museoModerno, notoSans } from '@/styles/fonts';

export const metadata: Metadata = {
  title: 'WanderWorld',
  openGraph: {
    siteName: 'Wander The World',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang='en'
      className='scroll-smooth antialiased'
      suppressHydrationWarning
    >
      <body className={`${notoSans.variable} ${museoModerno.variable} `}>
        <Providers>
          <Stack height='100%'>
            <Header />
            <Stack component='main' height='100%'>
              {children}
            </Stack>
          </Stack>
        </Providers>
      </body>
    </html>
  );
}
