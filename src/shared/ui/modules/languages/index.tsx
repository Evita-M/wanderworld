import { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { Chip, darken, Stack } from '@mui/material';
import { languages } from '@/lib/data/languages';
import { getLanguageColor } from '@/utils/get-language-color';

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
    <Stack
      direction='row'
      gap='0.8rem'
      sx={{
        flexWrap: 'wrap',
      }}
    >
      {langCodes.map((langCode) => {
        const language = languages.find((lang) => lang.id === langCode);
        const color = getLanguageColor(theme, langCode);
        return (
          <Chip
            key={langCode}
            label={language?.label}
            sx={{
              cursor: 'default',
              backgroundColor: color,
              '& .MuiChip-label': {
                color: darken(color, 0.6),
              },
              '&:hover': {
                backgroundColor: color,
              },
            }}
          />
        );
      })}
    </Stack>
  );
};
