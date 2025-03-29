import Image from 'next/image';
import { ErrorBoundary } from '@/shared/ui/modules/error-boundary/error-boundary';
import { routes } from '@/lib/config/routes';

export default async function NotFound() {
  return (
    <ErrorBoundary
      message='Guide Not Found'
      title="We couldn't find this guide"
      submessage='Check the page address or go to see other guides'
      button={{
        label: 'Explore other guide',
        href: routes.guides,
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
