import { ErrorPage } from '@/modules/error';
import Image from 'next/image';
import { routes } from '../routes';

export default async function NotFound() {
  return (
    <ErrorPage
      message='404 Not Found'
      title="Looks, like you're heading to a wrong destination"
      submessage='Check the page address or go home'
      button={{ label: 'Go back home', href: routes.home }}
    >
      <Image
        src='/plane.png'
        alt='Plane flying around the earth'
        width={340}
        height={340}
      />
    </ErrorPage>
  );
}
