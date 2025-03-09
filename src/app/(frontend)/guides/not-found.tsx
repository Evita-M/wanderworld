import Image from 'next/image';
import { ErrorBoundary } from '@/shared/ui/modules/error-boundary';
import { routes } from '@/lib/config/routes';

export default async function NotFound() {
  return (
    <ErrorBoundary
      message='Guides Not Found'
      title='Looks, like there is no guide you are looking for'
      submessage='Check the page address or go to see other guides'
      button={{
        label: 'Explore other guides',
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
