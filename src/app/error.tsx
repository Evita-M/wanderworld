'use client';
import { ErrorPage } from '@/modules/error';
import Image from 'next/image';

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
      title='Looks like we hit some turbulence on this journey'
      message='Oops! Something went wrong'
      submessage={error.message}
      button={{ label: 'Retry', onClick: reset }}
    >
      <Image src='/earth.png' alt='Earth' width={340} height={340} />
    </ErrorPage>
  );
}
