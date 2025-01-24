import { Button, SxProps, Theme } from '@mui/material';
import { ActionButtonProps, ActionVariant } from './types';
import { FC } from 'react';
import { ButtonIcon } from './ButtonIcon';

const getButtonStyles = (variant: ActionVariant): SxProps<Theme> => ({
  minWidth: variant === 'icon' ? '4rem' : '14rem',
  padding: variant === 'icon' ? '0.8rem' : undefined,
  borderRadius: variant === 'icon' ? '50%' : 'default',
});

export const ActionButton: FC<ActionButtonProps> = ({
  onClick,
  variant = 'default',
  icon,
  label,
  color = 'primary',
  disabled = false,
}) => (
  <Button
    onClick={onClick}
    variant='outlined'
    color={color}
    aria-label={label}
    disabled={disabled}
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
