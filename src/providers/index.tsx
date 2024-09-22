'use client';

import { ReactNode } from 'react';
import { ExpeditionsProvider } from './ExpeditionsProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material';
import theme from '@/styles/theme';
import { CssBaseline } from '@mui/material/';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { ModalProvider } from './ModalProvider';
import { SnackbarProvider } from './SnackProvider';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <SnackbarProvider>
            <ModalProvider>
              <ExpeditionsProvider>{children}</ExpeditionsProvider>
            </ModalProvider>
          </SnackbarProvider>
        </Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
