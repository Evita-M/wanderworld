import { FC } from 'react';
import { ActionsProps } from './types';
import { Stack } from '@mui/material';
import { ActionButton } from './ActionButton';

export const Actions: FC<ActionsProps> = ({
  actions,
  variant = 'default',
  direction = 'row',
  gap = '1.2rem',
  className,
}) => {
  return (
    <Stack gap={gap} direction={direction} className={className}>
      {actions.map((action, index) => (
        <ActionButton
          key={`${action.label}-${index}`}
          onClick={action.onClick}
          variant={variant}
          icon={action.icon}
          label={action.label}
          color={action.color}
          disabled={action.disabled}
        />
      ))}
    </Stack>
  );
};
