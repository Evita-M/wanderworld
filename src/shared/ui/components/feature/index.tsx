import { Typography } from '@mui/material';
import { ReactNode } from 'react';

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactNode;
}

export const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <div className='flex flex-col gap-4 rounded-[16px] border border-gray-200 p-6'>
      <Typography color='text.secondary'>{title}</Typography>
      <div className='flex items-center gap-4'>
        {icon}
        <Typography variant='h6' component='p'>
          {text}
        </Typography>
      </div>
    </div>
  );
};
