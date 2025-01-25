import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { expeditionSchema, ExpeditionSchema, defaultValues} from '@/shared/ui/modules/expedition-form';

export const ExpeditionsProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm<ExpeditionSchema>({
    mode: 'all',
    resolver: zodResolver(expeditionSchema),
    defaultValues,
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};
