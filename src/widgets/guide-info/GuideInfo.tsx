'use client';
import { FC } from 'react';
import { Typography } from '@mui/material';
import { GuideInfoItem } from './GuideInfoItem';

interface GuideInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

interface GuideInfoProps {
  guide?: GuideInfo;
}

export const GuideInfo: FC<GuideInfoProps> = ({ guide }) => {
  return (
    <article className='rounded-[1.6rem] border border-gray-200 p-[2.4rem]'>
      <Typography variant='h5' component='h2' className='mb-[3.2rem]'>
        Expedition Guides
      </Typography>
      {guide ? (
        <GuideInfoItem
          title={`${guide.firstName} ${guide.lastName}`}
          subtitle={guide.email}
          avatar={guide.avatar}
        />
      ) : (
        <Typography>No guide assigned yet</Typography>
      )}
    </article>
  );
};
