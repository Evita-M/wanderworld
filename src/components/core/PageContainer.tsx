import { Stack } from '@mui/material';
import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <Stack
      component='main'
      sx={{
        maxWidth: '192rem',
        mx: 'auto',
        p: '1.6rem',
        width: '100%',
        height: '100%',
      }}
    >
      <>{children}</>
    </Stack>
  );
};
