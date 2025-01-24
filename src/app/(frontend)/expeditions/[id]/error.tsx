'use client';

import { routes } from '@/routes/index';
import { ErrorBoundary } from '@/shared/ui/modules/error-boundary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ErrorProps {
  error: Error & {
    digest?: string;
    status?: number;
    code?: string;
  };
}

export default function Error({ error }: ErrorProps) {
  const router = useRouter();
  return (
    <ErrorBoundary
      //   message={error.code}
      message='Error code'
      title='This adventure is off the beaten path'
      submessage={error.message}
      button={{
        label: 'Go back to expeditions',
        onClick: () => router.push(routes.expeditions),
      }}
      image={
        <Image
          src='/plane.png'
          alt='Plane flying around the earth'
          width={340}
          height={340}
        />
      }
    />
  );
}
