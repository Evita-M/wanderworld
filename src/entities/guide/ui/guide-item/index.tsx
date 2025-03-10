import { Stack, useTheme } from '@mui/material';
import { FC } from 'react';
import { GuideHeader } from '../guide-header';
import { grey } from '@mui/material/colors';
import { LanguageCode } from '@/shared/ui/modules/languages';
import { TruncatedText } from '@/shared/ui/core/typography';
import { RichTextRenderer } from '@/shared/ui/components/rich-text';
import { Guide } from '../../model';

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
  const theme = useTheme();

  return (
    <Stack
      bgcolor='#fff'
      height='26rem'
      gap='1rem'
      p='2.4rem'
      borderRadius={theme.borderRadius.large}
      border={`1px solid ${isSelected ? theme.palette.info.main : grey[300]}`}
      position='relative'
      onClick={() => onClick(id)}
      boxShadow={isSelected ? `0 6px  ${theme.palette.info.main}` : grey[300]}
      sx={{
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
    >
      <GuideHeader
        fullName={fullName}
        languages={languages as LanguageCode[]}
        avatarSrc={avatar}
      />
      <TruncatedText sx={{ mt: '1.2rem', px: '1.2rem' }}>
        <RichTextRenderer content={description || ''} />
      </TruncatedText>
    </Stack>
  );
};
