import theme from '@/styles/theme';
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
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '52rem',
  minHeight: '24rem',
  width: '100%',
  bgcolor: 'background.paper',
  borderRadius: theme.borderRadius.large,
  boxShadow: 24,
  p: '3.2rem 2.4rem',
  display: 'flex',
  flexDirection: 'column',
};

const ModalContext = createContext<ModalContextProps>(initData);

const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<ReactElement | null>(null);
  const [title, setTitle] = useState<string | undefined>(undefined);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setContent(null);
    setTitle(undefined);
  }, []);

  const openModal = useCallback(
    ({ content, title }: { content: ReactElement; title?: string }) => {
      setContent(content);
      setTitle(title);
      setIsOpen(true);
    },
    []
  );

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <Modal open={isOpen} onClose={closeModal}>
        <Box sx={modalWrapperStyles}>
          {title && (
            <Typography component='h2' variant='h5' mb='2.2rem'>
              {title}
            </Typography>
          )}
          {content}
        </Box>
      </Modal>
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
