import {
  Tooltip,
  Button,
  CircularProgress,
  SxProps,
  Theme,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { FC } from 'react';

interface AiButtonProps {
  label: string;
  onClick: VoidFunction;
  tooltipText: string;
  isLoading?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

export const AiButton: FC<AiButtonProps> = ({
  label,
  onClick,
  tooltipText,
  isLoading = false,
  disabled = false,
  sx,
}) => {
  return (
    <Tooltip title={tooltipText} placement='top'>
      <Button
        onClick={onClick}
        disabled={isLoading || disabled}
        size='small'
        color='secondary'
        startIcon={
          isLoading ? (
            <CircularProgress size='1rem' color='primary' />
          ) : (
            <AutoAwesomeIcon />
          )
        }
        variant='contained'
        sx={sx}
      >
        {label}
      </Button>
    </Tooltip>
  );
};
