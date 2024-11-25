import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import {
  ExpeditionSchema,
  expeditionSchema,
  defaultValues,
} from '@/type/expeditionSchema';

export const ExpeditionsProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm<ExpeditionSchema>({
    mode: 'all',
    resolver: zodResolver(expeditionSchema),
    defaultValues,
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};
