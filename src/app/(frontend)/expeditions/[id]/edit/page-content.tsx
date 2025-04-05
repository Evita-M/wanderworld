'use client';
import { EditExpedition } from '@/features/edit-expedition/edit-expedition';
import { BackButton } from '@/shared/ui/core/button/back-button';
import { PageHeader } from '@/shared/ui/core/typography/page-header';

export default function PageContent() {
  return (
    <>
      <PageHeader
        title='Edit Expedition'
        prefix={<BackButton />}
        sx={{ mb: '4rem' }}
      />
      <EditExpedition />
    </>
  );
}
