import { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { Chip, darken, Stack } from '@mui/material';
import { getLanguageColor } from '@/utils/get-language-color';
import { Language } from '@/shared/types/Language';

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

interface LanguagesListProps {
  languages: Language[];
}

export const LanguagesList: FC<LanguagesListProps> = ({ languages }) => {
  const theme = useTheme();

  return (
    <Stack
      direction='row'
      gap='0.8rem'
      sx={{
        flexWrap: 'wrap',
      }}
    >
      {languages.map((language) => {
        const color = getLanguageColor(theme, language.code as LanguageCode);
        return (
          <Chip
            key={language.code}
            label={language.name}
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
