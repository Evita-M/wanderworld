'use client';

import { useDeleteGuideMutation } from '@/entities/guide/api';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/config/routes';
import { ModalConfirmation } from '@/shared/ui/modules/modal/modal-confirmation';
import { useModal } from '@/lib/hooks/use-modal';
import { useSnackbar } from '@/lib/hooks/use-snackbar';

interface DeleteGuideProps {
  id: string;
  fullName: string;
}

export const DeleteGuide = ({ id, fullName }: DeleteGuideProps) => {
  const { openModal, closeModal } = useModal();
  const { showSnackBar } = useSnackbar();
  const router = useRouter();
  const [deleteGuide, { isLoading: isDeleteGuideLoading }] =
    useDeleteGuideMutation();

  const onDelete = async (id: string) => {
    await deleteGuide(id);
    router.push(routes.guides);
    showSnackBar('Guide was deleted', 'success');
    closeModal();
  };

  const handleDelete = () => {
    openModal({
      title: 'Delete guide',
      content: (
        <ModalConfirmation
          text={`Are you sure you want to delete guide ${fullName}?`}
          submitBtnLabel='Delete'
          onCancel={closeModal}
          onSubmit={() => onDelete(id)}
          isDisabled={isDeleteGuideLoading}
        />
      ),
    });
  };

  return { handleDelete, isDeleteGuideLoading };
};
