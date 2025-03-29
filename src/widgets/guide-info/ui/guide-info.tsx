'use client';
import { FC } from 'react';
import { Typography } from '@mui/material';
import { GuideInfoItem } from './guide-info-item';

interface GuideInfoProps {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
}

export const GuideInfo: FC<GuideInfoProps> = ({
  id,
  fullName,
  email,
  avatar,
}) => {
  return (
    <article className='rounded-[1.6rem] border border-gray-200 p-[2.4rem]'>
      <Typography variant='h5' component='h2' className='mb-[3.2rem]'>
        Expedition Guides
      </Typography>
      <GuideInfoItem title={fullName} subtitle={email} avatar={avatar} />
    </article>
  );
};
