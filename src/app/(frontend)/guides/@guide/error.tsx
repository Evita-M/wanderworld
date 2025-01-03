'use client';
import { ErrorPage } from '@/modules/error';
import { borderRadius } from '@/styles/border-radius';
import { Stack } from '@mui/material';
import { grey } from '@mui/material/colors';

interface ErrorBoundaryProps {
  error: Error & {
    digest?: string;
    status?: number;
    code?: string;
  };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <Stack
      border={`1px solid ${grey[300]}`}
      borderRadius={borderRadius.large}
      height='100%'
    >
      <ErrorPage
        title='Oops! Something went wrong'
        submessage={error.message}
        button={{ label: 'Retry', onClick: reset }}
      />
    </Stack>
  );
}
