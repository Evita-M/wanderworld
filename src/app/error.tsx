'use client';
import { ErrorBoundary } from '@/shared/ui/modules/error-boundary/error-boundary';
import Image from 'next/image';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <ErrorBoundary
      title='Looks like we hit some turbulence on this journey'
      message={error.message}
      submessage='We apologize for the inconvenience'
      button={{
        label: 'Reload page',
        onClick: reset,
      }}
      image={<Image src='/earth.png' alt='Earth' width={340} height={340} />}
    />
  );
}
