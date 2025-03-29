'use client';
import { EditExpedition } from '@/features/edit-expedition/edit-expedition';
import { routes } from '@/lib/config/routes';
import { BackButton } from '@/shared/ui/core/button/back-button';
import { PageHeader } from '@/shared/ui/core/typography/page-header';
import { useParams, useRouter } from 'next/navigation';

export default function PageContent() {
  const router = useRouter();
  const params = useParams();

  const redirectToExpedition = () =>
    router.push(`${routes.expeditions}/${params.id}`);

  return (
    <>
      <PageHeader
        title='Edit Expedition'
        prefix={<BackButton onClick={redirectToExpedition} color='secondary' />}
        sx={{ mb: '4rem' }}
      />
      <EditExpedition />
    </>
  );
}
