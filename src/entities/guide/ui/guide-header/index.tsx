import { Box, Stack, Typography, TypographyProps } from '@mui/material';
import { FC, ReactNode, useMemo } from 'react';
import { grey } from '@mui/material/colors';
import { Avatar } from '@/shared/ui/core/avatar';
import { Contact } from '@/shared/ui/modules/contact';
import { Language } from '@/shared/types/Language';
import { LanguagesList } from '@/shared/ui/modules/languages/LanguagesList';

export enum GuideHeaderSize {
  DEFAULT = 'default',
  LG = 'lg',
}

interface GuideHeaderProps {
  fullName: string;
  languages: Language[];
  email?: string;
  phoneNumber?: string;
  avatarSrc?: string;
  size?: GuideHeaderSize;
  actions?: ReactNode;
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
    spacing: '2.4rem',
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
  actions,
  size = GuideHeaderSize.DEFAULT,
}) => {
  const { avatarSize, spacing, typographyVariant } = useMemo(
    () => SIZE_STYLES[size],
    [size]
  );

  return (
    <Stack direction='row' spacing={spacing}>
      <Avatar size={avatarSize} src={avatarSrc} />
      <Box width='100%'>
        <Stack direction='row' justifyContent='space-between' width='100%'>
          <Box>
            <Typography letterSpacing='0.05em' color={grey[400]}>
              WanderWorld Guide
            </Typography>
            <Typography variant={typographyVariant} component='h3' mb={spacing}>
              {fullName}
            </Typography>
          </Box>
          {actions}
        </Stack>
        <Stack sx={{ minWidth: 0 }} mb={spacing}>
          <LanguagesList languages={languages} />
        </Stack>
        {size === GuideHeaderSize.LG && (
          <Contact email={email} phoneNumber={phoneNumber} />
        )}
      </Box>
    </Stack>
  );
};
