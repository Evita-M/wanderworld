import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, Suspense } from 'react';
import { guideSchema, GuideSchema, initialValues } from '@/shared/ui/modules/guide-form';


export const GuideProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm<GuideSchema>({
    mode: 'all',
    resolver: zodResolver(guideSchema),
    defaultValues: initialValues,
  });

  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <FormProvider {...methods}>{children}</FormProvider>
    </Suspense>
  );
};
