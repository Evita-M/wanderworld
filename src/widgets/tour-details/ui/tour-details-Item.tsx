import { Typography } from '@mui/material';
import { FC } from 'react';

interface TourDetailsItemProps {
  title: string;
  children: React.ReactNode;
}

export const TourDetailsItem: FC<TourDetailsItemProps> = ({
  title,
  children,
}) => {
  return (
    <div className='flex flex-col gap-[1.4rem] rounded-[1.6rem] border border-gray-200 p-[1.8rem]'>
      <Typography className='text-[1.2rem] font-light uppercase tracking-[0.1em] text-gray-700'>
        {title}
      </Typography>
      {children}
    </div>
  );
};
