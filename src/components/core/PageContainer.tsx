import { Stack } from '@mui/material';
import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: string;
}

export const PageContainer = ({
  children,
  maxWidth = 'xl',
}: PageContainerProps) => {
  return (
    <Stack
      component='main'
      sx={{
        maxWidth,
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
