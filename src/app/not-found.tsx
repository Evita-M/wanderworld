import Image from 'next/image';
import { routes } from '@/lib/config/routes';
import { ErrorBoundary } from '@/shared/ui/modules/error-boundary/error-boundary';

export default async function NotFound() {
  return (
    <ErrorBoundary
      message='Page Not Found'
      title="Looks, like you're heading to a wrong destination"
      submessage='Check the page address or go home'
      button={{
        label: 'Go back home',
        href: routes.home,
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
