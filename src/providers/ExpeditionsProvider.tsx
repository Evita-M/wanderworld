import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import {
  ExpeditionSchema,
  defaultValues,
  expeditionSchema,
} from '@/modules/forms/expedition/validation';

export const ExpeditionsProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm<ExpeditionSchema>({
    mode: 'all',
    resolver: zodResolver(expeditionSchema),
    defaultValues,
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};
