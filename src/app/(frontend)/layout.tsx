import type { Metadata } from 'next';
import './globals.css';
import { Stack } from '@mui/material';
import { Providers } from '@/providers/index';
import { Header } from '@/modules/Header';

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
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${notoSans.variable} ${museoModerno.variable}`}>
      <head></head>
      <body>
        <Providers>
          <Stack height='100%'>
            <Header />
            <>{children}</>
          </Stack>
        </Providers>
      </body>
    </html>
  );
}
