import { FC } from 'react';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Button, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  onClick?: VoidFunction;
  sx?: object;
  label?: string;
}

export const BackButton: FC<BackButtonProps> = ({
  onClick,
  label = 'Back',
  sx,
}) => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Button
      component='a'
      onClick={onClick || (() => router.back())}
      startIcon={<ArrowBackRoundedIcon fontSize='large' />}
      className='group'
      sx={{
        color: theme.palette.tertiary.dark,
        backgroundColor: 'transparent',
        p: '1.2rem',
        '&:hover': {
          color: theme.palette.tertiary.darker,
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
        ...sx,
      }}
    >
      <span className='relative'>
        {label}
        <span className='absolute bottom-0 left-0 h-0.5 w-full origin-left bg-current transition-transform duration-300 ease-out group-hover:scale-x-0'></span>
      </span>
    </Button>
  );
};
