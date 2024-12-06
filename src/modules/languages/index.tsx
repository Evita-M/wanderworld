import React, { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { Chip, darken, Stack } from '@mui/material';
import { getLanguageColor } from '@/utils/get-languages-color';
import { languages } from '@/lib/data/languages';

export type LanguageCode =
  | 'en'
  | 'es'
  | 'pt'
  | 'ar'
  | 'de'
  | 'ru'
  | 'zh'
  | 'hi'
  | 'fr';

interface LanguagesProps {
  langCodes: LanguageCode[];
}

export const Languages: FC<LanguagesProps> = ({ langCodes }) => {
  const theme = useTheme();

  return (
    <Stack direction='row' flexWrap='wrap' gap='0.8rem'>
      {langCodes.map((langCode) => {
        const language = languages.find((lang) => lang.id === langCode);
        const color = getLanguageColor(theme, langCode);
        return (
          <Chip
            key={langCode}
            label={language?.label}
            sx={{
              cursor: 'default',
              backgroundColor: color?.bg,
              '& .MuiChip-label': {
                color: color?.text,
              },
              '&:hover': {
                backgroundColor: color?.bg ? darken(color.bg, 0.05) : undefined,
              },
            }}
          />
        );
      })}
    </Stack>
  );
};
