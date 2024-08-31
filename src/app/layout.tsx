import type { Metadata } from 'next';
import './globals.css';
import { Stack } from '@mui/material';
import { Providers } from '@/providers/index';
import { Header } from '@/modules/Header';

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
    <html lang='en'>
      <head></head>
      <body>
        <Providers>
          <Stack height='100%'>
            <Header />
            <Stack component='main' flex={1} p={4}>
              {children}
            </Stack>
          </Stack>
        </Providers>
      </body>
    </html>
  );
}
