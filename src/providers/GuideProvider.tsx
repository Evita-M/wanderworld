import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { GuideSchema, guideSchema, defaultValues } from '@/type/guideSchema';

export const GuideProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm<GuideSchema>({
    mode: 'all',
    resolver: zodResolver(guideSchema),
    defaultValues,
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};
