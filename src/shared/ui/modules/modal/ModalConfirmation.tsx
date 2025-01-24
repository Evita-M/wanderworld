import { FC } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useModal } from '@/shared/hooks/useModal';


interface ModalConfirmationProps {
  text: string;
  cancelBtnLabel?: string;
  submitBtnLabel?: string;
  onSubmit: () => void;
  isDisabled?: boolean;
  onCancel?: () => void;
}

export const ModalConfirmation: FC<ModalConfirmationProps> = ({
  text,
  cancelBtnLabel = 'Cancel',
  submitBtnLabel = 'Confirm',
  onCancel,
  onSubmit,
  isDisabled = false,
}) => {
  const { closeModal } = useModal();

  const handleOnCancel = () => {
    closeModal();
    onCancel?.();
  };

  return (
    <Stack
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      height='100%'
      flex='1'
      spacing='3.2rem'
    >
      <Typography>{text}</Typography>
      <Stack direction='row' gap='1.2rem'>
        <Button
          variant='outlined'
          color='secondary'
          onClick={handleOnCancel}
          fullWidth
        >
          {cancelBtnLabel}
        </Button>
        <Button
          variant='contained'
          onClick={onSubmit}
          disabled={isDisabled}
          fullWidth
        >
          {submitBtnLabel}
        </Button>
      </Stack>
    </Stack>
  );
};
