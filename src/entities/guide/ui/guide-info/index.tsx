'use client';
import { FC } from 'react';
import { Typography } from '@mui/material';
import { Avatar } from '@/shared/ui/core/avatar';
import { Guide } from '../../model';

interface GuideDetailsProps {
  title: string;
  subtitle: string;
  avatar?: string;
}

interface GuideInfoProps {
  guide?: Guide;
}

const GuideDetails: FC<GuideDetailsProps> = ({
  title,
  subtitle,
  avatar = '',
}) => (
  <div className='flex items-center gap-8 text-center'>
    <Avatar src={avatar} alt={title} size={80} />
    <div className='flex flex-col gap-2 text-left'>
      <Typography component='p' fontSize='1.8rem'>
        {title}
      </Typography>
      <Typography color='text.secondary'>{subtitle}</Typography>
    </div>
  </div>
);

export const GuideInfo: FC<GuideInfoProps> = ({ guide }: GuideInfoProps) => {
  const guideDetails = guide
    ? {
        title: `${guide?.firstName} ${guide?.lastName}`,
        subtitle: guide?.email,
        avatar: guide?.avatar,
      }
    : {
        title: 'No Guide',
        subtitle: 'Guide to be assigned soon',
      };

  return (
    <div className='rounded-[16px] border border-gray-200 p-10'>
      <Typography variant='h5' component='p' mb='2.4rem'>
        Expedition Guides
      </Typography>
      <GuideDetails {...guideDetails} />
    </div>
  );
};
