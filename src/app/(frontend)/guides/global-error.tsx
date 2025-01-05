'use client';
import { ErrorBoundary } from '@/modules/error-boundary';

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
      buttonLabel='Retry'
      onClick={reset}
      sx={{
        position: 'absolute',
        inset: 0,
      }}
    />
  );
}
