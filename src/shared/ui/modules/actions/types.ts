import { ReactNode } from 'react';
import { ButtonProps } from '@mui/material';
export type ActionColor = ButtonProps['color'];
export type ActionVariant = 'default' | 'icon';

export interface ActionConfig {
  label: string;
  icon: ReactNode;
  onClick: VoidFunction;
  color?: ActionColor;
  variant?: ButtonProps['variant'];
  disabled?: boolean;
}

export interface ActionsProps {
  actions: ActionConfig[];
  direction?: 'row' | 'column';
  gap?: string | number;
  className?: string;
}

export interface ButtonIconProps {
  icon: ReactNode;
  showLabel?: boolean;
}
