import { Box, Modal, Typography } from '@mui/material';
import React, {
  createContext,
  useState,
  useCallback,
  ReactElement,
  FC,
  PropsWithChildren,
} from 'react';

type ModalContextProps = {
  isOpen: boolean;
  openModal: ({
    content,
    title,
  }: {
    content: ReactElement;
    title?: string;
  }) => void;

  closeModal: () => void;
};

const initData: ModalContextProps = {
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
};

const modalWrapperStyles = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '2.4rem',
  boxShadow: 24,
  p: 4,
};

const ModalContext = createContext<ModalContextProps>(initData);

const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactElement | null>(null);
  const [modalTitle, setModalTitle] = useState<string | undefined>(undefined);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalContent(null);
    setModalTitle(undefined);
  }, []);

  const openModal = useCallback(
    ({ content, title }: { content: ReactElement; title?: string }) => {
      setModalContent(content);
      setModalTitle(title);
      setIsOpen(true);
    },
    []
  );

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <Modal open={isOpen} onClose={closeModal}>
        <Box sx={modalWrapperStyles}>
          {modalTitle && (
            <Typography component='h2' variant='h4' mb='2.4rem'>
              {modalTitle}
            </Typography>
          )}
          {modalContent}
        </Box>
      </Modal>
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
