import Image from 'next/image';
import { ErrorBoundary } from '@/shared/ui/modules/error-boundary';
import { routes } from '@/lib/config/routes';

export default async function NotFound() {
  return (
    <ErrorBoundary
      message='Guide Not Found'
      title="Looks, like you're heading to a wrong destination"
      submessage='Check the page address or go to see other expeditions'
      button={{
        label: 'Explore other expeditions',
        href: routes.expeditions,
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
