'use client';
import { ErrorBoundary } from '@/shared/ui/modules/error-boundary/error-boundary';

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
      title='Oops! Something went wrong'
      submessage={error.message}
      button={{
        label: 'Retry',
        onClick: reset,
      }}
      sx={{
        position: 'absolute',
        inset: 0,
      }}
    />
  );
}
