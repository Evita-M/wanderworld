import { ModalContext } from '@/providers/ModalProvider';
import { useContext } from 'react';

const useModal = () => {
  if (!ModalContext)
    throw new Error('useModal must be used within a ModalProvider');

  return useContext(ModalContext);
};

export { useModal };
