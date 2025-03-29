import { Typography } from '@mui/material';
import { ReactNode } from 'react';

export interface FeatureItemProps {
  title: string;
  text: string;
  icon: ReactNode;
}

export const FeatureItem = ({ title, text, icon }: FeatureItemProps) => {
  return (
    <div className='flex flex-col gap-[1.4rem] rounded-[1.6rem] border border-gray-200 p-[1.8rem]'>
      <Typography className='text-[1.2rem] font-light uppercase tracking-[0.1em] text-gray-700'>
        {title}
      </Typography>
      <div className='flex items-center gap-4'>
        {icon}
        <Typography variant='h6' component='p'>
          {text}
        </Typography>
      </div>
    </div>
  );
};
