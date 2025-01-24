'use client';

import { ErrorBoundary } from '@/shared/ui/modules/error-boundary';
import Image from 'next/image';

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
      title='Looks like we hit some turbulence on this journey'
      message='Whoops! Something went wrong'
      submessage={error.message}
      button={{
        label: 'Retry',
        onClick: reset,
      }}
      image={<Image src='/earth.png' alt='Earth' width={340} height={340} />}
    />
  );
}
