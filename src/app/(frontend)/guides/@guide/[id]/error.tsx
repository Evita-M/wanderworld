'use client';

import { ErrorBoundary } from '@/modules/error-boundary';
import { borderRadius } from '@/styles/border-radius';
import { grey } from '@mui/material/colors';

interface ErrorProps {
  error: Error & {
    digest?: string;
    status?: number;
    code?: string;
  };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <ErrorBoundary
      title='Oops! Something went wrong with this guide'
      submessage={error.message}
      buttonLabel='Retry'
      onClick={reset}
      sx={{
        borderRadius: borderRadius.large,
        border: `1px solid ${grey[300]}`,
      }}
    />
  );
}
