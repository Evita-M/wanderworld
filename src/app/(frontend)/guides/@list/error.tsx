'use client';
import { ErrorPage } from '@/modules/error';

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
    <ErrorPage
      title='Oops! Something went wrong'
      submessage={error.message}
      button={{ label: 'Retry', onClick: reset }}
    />
  );
}
