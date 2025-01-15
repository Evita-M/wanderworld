import { FC, ReactNode } from 'react';
import { Button, Stack, SxProps, Theme, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type ActionVariant = 'default' | 'icon';

interface ActionButtonProps {
  onClick: VoidFunction;
  variant: ActionVariant;
  icon: ReactNode;
  label: string;
  color?: 'primary' | 'error';
}

interface ActionsProps {
  onEdit: VoidFunction;
  onDelete: VoidFunction;
  variant?: ActionVariant;
}

const getButtonStyles = (variant: ActionVariant): SxProps<Theme> => ({
  minWidth: variant === 'icon' ? '4rem' : '14rem',
  padding: variant === 'icon' ? '0.8rem' : undefined,
  borderRadius: variant === 'icon' ? '50%' : 'default',
});

const ButtonIcon: FC<{ icon: ReactNode; showLabel?: boolean }> = ({
  icon,
  showLabel = false,
}) => (
  <Box component='span' sx={{ display: 'inline-flex', mr: showLabel ? 1 : 0 }}>
    {icon}
  </Box>
);

const ActionButton: FC<ActionButtonProps> = ({
  onClick,
  variant,
  icon,
  label,
  color = 'primary',
}) => (
  <Button
    onClick={onClick}
    variant='outlined'
    color={color}
    aria-label={label}
    sx={getButtonStyles(variant)}
  >
    {variant === 'icon' ? (
      <ButtonIcon icon={icon} />
    ) : (
      <>
        <ButtonIcon icon={icon} showLabel />
        {label}
      </>
    )}
  </Button>
);

export const Actions: FC<ActionsProps> = ({
  onEdit,
  onDelete,
  variant = 'default',
}) => {
  return (
    <Stack gap='1.2rem' direction='row'>
      <ActionButton
        onClick={onDelete}
        variant={variant}
        icon={<DeleteIcon />}
        label='Delete'
        color='error'
      />
      <ActionButton
        onClick={onEdit}
        variant={variant}
        icon={<EditIcon />}
        label='Edit'
      />
    </Stack>
  );
};
