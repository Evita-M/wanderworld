import { ModalContext } from '@/providers/modal-provider';
import { useContext } from 'react';

const useModal = () => {
  if (!ModalContext)
    throw new Error('useModal must be used within a ModalProvider');

  return useContext(ModalContext);
};

export { useModal };
