import { ReactNode } from 'react';
import { ButtonProps } from '@mui/material';

export type ActionColor = ButtonProps['color'];
export type ActionVariant = 'default' | 'icon';

export interface ActionConfig {
  label: string;
  icon: ReactNode;
  onClick: VoidFunction;
  color?: ActionColor;
  disabled?: boolean;
}

export interface ActionsProps {
  actions: ActionConfig[];
  variant?: ActionVariant;
  direction?: 'row' | 'column';
  gap?: string | number;
  className?: string;
}

export interface ActionButtonProps extends ActionConfig {
  variant?: ActionVariant;
}

export interface ButtonIconProps {
  icon: ReactNode;
  showLabel?: boolean;
}
