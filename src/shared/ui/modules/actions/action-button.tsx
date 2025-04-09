import { Button } from '@mui/material';
import { ActionConfig } from './types';
import { FC } from 'react';
import { ButtonIcon } from './button-icon';

export const ActionButton: FC<ActionConfig> = ({
  onClick,
  icon,
  label,
  color = 'primary',
  variant = 'outlined',
  disabled = false,
}) => (
  <Button
    onClick={onClick}
    variant={variant}
    color={color}
    aria-label={label}
    disabled={disabled}
    startIcon={icon ? <ButtonIcon icon={icon} /> : undefined}
  >
    {label}
  </Button>
);
