import { Stack, Typography } from '@mui/material';
import { Guide } from '@prisma/client';
import React, { FC } from 'react';
import { GuideHeader } from '../guide-header';

import { TruncatedText } from '@/components/core/TruncatedText';
import theme from '@/styles/theme';

interface GuideItemProps {
  guide: Guide;
  onClick: any;
  isSelected: boolean;
}

export const GuideItem: FC<GuideItemProps> = ({
  guide,
  onClick,
  isSelected,
}) => {
  const { id, firstName, lastName, languages, avatar, description } = guide;
  const fullName = `${firstName} ${lastName}`;

  return (
    <Stack
      bgcolor='#fff'
      gap='1rem'
      p={2}
      borderRadius='1.2rem'
      border={`1px solid ${isSelected ? theme.palette.primary.main : 'transparent'}`}
      position='relative'
      onClick={() => onClick(id)}
      boxShadow={isSelected ? `0 6px  ${theme.palette.primary.main}` : 'none'}
      sx={{
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
    >
      <GuideHeader
        fullName={fullName}
        languages={languages}
        avatarSrc={avatar}
      />
      <TruncatedText sx={{ mt: '1.2rem', px: '1.2rem' }}>
        {description}
      </TruncatedText>
    </Stack>
  );
};
