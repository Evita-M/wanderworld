import { Actions } from '@/shared/ui/modules/actions';
import { DeleteGuide } from '@/features/guide/delete';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/config/routes';

interface GuideActionsProps {
  id: string;
  fullName: string;
}

export const GuideActions: FC<GuideActionsProps> = ({ id, fullName }) => {
  const router = useRouter();
  const { handleDelete, isDeleteGuideLoading } = DeleteGuide({
    id,
    fullName,
  });

  const redirectToEdit = () => {
    router.push(`${routes.guides}/${id}/edit`);
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
      disabled: isDeleteGuideLoading,
      color: 'error' as const,
    },
  ];

  return <Actions actions={actions} variant='icon' />;
};
