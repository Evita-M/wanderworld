import { Avatar } from '@/shared/ui/core/avatar';
import { Typography } from '@mui/material';
import { FC } from 'react';

interface GuideInfoItemProps {
  title: string;
  subtitle: string;
  avatar?: string;
}

export const GuideInfoItem: FC<GuideInfoItemProps> = ({
  title,
  subtitle,
  avatar,
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
