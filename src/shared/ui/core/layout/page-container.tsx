import { Stack, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: string;
  sx?: SxProps<Theme>;
}

export const PageContainer = ({
  children,
  maxWidth = '100%',
  sx,
}: PageContainerProps) => {
  return (
    <Stack
      sx={{
        maxWidth,
        mx: 'auto',
        p: '3.2rem',
        width: '100%',
        height: '100%',
        ...(sx || {}),
      }}
    >
      <>{children}</>
    </Stack>
  );
};
