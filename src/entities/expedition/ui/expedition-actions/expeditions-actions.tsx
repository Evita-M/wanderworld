import { Actions } from '@/shared/ui/modules/actions';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/config/routes';
import { DeleteExpedition } from '@/features/delete-expedition/delete-expedition';

interface ExpeditionActionsProps {
  id: string;
  name: string;
}

export const ExpeditionActions: FC<ExpeditionActionsProps> = ({ id, name }) => {
  const router = useRouter();
  const { handleDelete, isDeleteExpeditionLoading } = DeleteExpedition({
    id,
    name,
  });

  const redirectToEdit = () => {
    router.push(`${routes.expeditions}/${id}/edit`);
  };
  const actions = [
    {
      label: 'Edit',
      icon: <EditIcon />,
      onClick: redirectToEdit,
    },
    {
      label: 'Delete',
      icon: <DeleteIcon />,
      onClick: handleDelete,
      disabled: isDeleteExpeditionLoading,
      color: 'error' as const,
    },
  ];

  return <Actions actions={actions} variant='icon' />;
};
