import { Avatar, Stack, Typography, TypographyProps } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { LanguageCode, Languages } from '../languages';
import { grey } from '@mui/material/colors';
import { Contact } from '../contact';

export enum GuideHeaderSize {
  DEFAULT = 'default',
  LG = 'lg',
}

interface GuideHeaderProps {
  fullName: string;
  languages: LanguageCode[];
  email?: string;
  phoneNumber?: string;
  avatarSrc?: string;
  size?: GuideHeaderSize;
}

const SIZE_STYLES: Record<
  GuideHeaderSize,
  {
    avatarSize: number;
    spacing: number | string;
    typographyVariant: TypographyProps['variant'];
  }
> = {
  [GuideHeaderSize.LG]: {
    avatarSize: 160,
    spacing: '1.8rem',
    typographyVariant: 'h4',
  },
  [GuideHeaderSize.DEFAULT]: {
    avatarSize: 68,
    spacing: '1.2rem',
    typographyVariant: 'h5',
  },
};

export const GuideHeader: FC<GuideHeaderProps> = ({
  fullName,
  email,
  languages,
  avatarSrc,
  phoneNumber,
  size = GuideHeaderSize.DEFAULT,
}) => {
  const { avatarSize, spacing, typographyVariant } = useMemo(
    () => SIZE_STYLES[size],
    [size]
  );

  return (
    <Stack direction='row' spacing={spacing}>
      <Avatar
        sx={{
          width: avatarSize,
          height: avatarSize,
        }}
        src={avatarSrc}
      />
      <Stack>
        <Typography letterSpacing='0.05em' color={grey[400]}>
          WanderWorld Guide
        </Typography>
        <Typography variant={typographyVariant} component='h2' mb={spacing}>
          {fullName}
        </Typography>
        <Languages langCodes={languages} />
        {size === GuideHeaderSize.LG && (
          <Contact email={email} phoneNumber={phoneNumber} />
        )}
      </Stack>
    </Stack>
  );
};
