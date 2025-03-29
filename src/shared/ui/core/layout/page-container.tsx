import { Stack, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: string;
  sx?: SxProps<Theme>;
}

export const PageContainer = ({
  children,
  maxWidth = 'xl',
  sx,
}: PageContainerProps) => {
  return (
    <Stack
      sx={{
        maxWidth,
        mx: 'auto',
        p: '1.6rem 1.6rem 3.2rem',
        width: '100%',
        height: '100%',
        ...(sx || {}),
      }}
    >
      <>{children}</>
    </Stack>
  );
};
