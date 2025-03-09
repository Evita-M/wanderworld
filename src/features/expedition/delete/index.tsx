import { useModal } from '@/lib/hooks/useModal';
import { useSnackbar } from '@/lib/hooks/useSnackbar';
import { ModalConfirmation } from '@/shared/ui/modules/modal';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/config/routes';
import { useDeleteExpeditionMutation } from '@/entities/expedition/api';

interface DeleteExpeditionProps {
  id: string;
  name: string;
}

export const DeleteExpedition = ({ id, name }: DeleteExpeditionProps) => {
  const { openModal, closeModal } = useModal();
  const { showSnackBar } = useSnackbar();
  const router = useRouter();
  const [deleteExpedition, { isLoading: isDeleteExpeditionLoading }] =
    useDeleteExpeditionMutation();

  const onDelete = async (id: string) => {
    await deleteExpedition(id);
    router.push(routes.expeditions);
    showSnackBar('Expedition was deleted', 'success');
    closeModal();
  };

  const handleDelete = () => {
    openModal({
      title: 'Delete guide',
      content: (
        <ModalConfirmation
          text={`Are you sure you want to delete expedition ${name}?`}
          submitBtnLabel='Delete'
          onCancel={closeModal}
          onSubmit={() => onDelete(id)}
          isDisabled={isDeleteExpeditionLoading}
        />
      ),
    });
  };

  return { handleDelete, isDeleteExpeditionLoading };
};
