import { languages } from '@/lib/data/languages';
import { getLanguagesNames } from '@/utils/get-languages-names';
import { Chip, darken, Stack } from '@mui/material';
import React, { FC } from 'react';

interface LangColor {
  background: string;
  text: string;
}

const langColors: Record<string, LangColor> = {
  en: { background: '#D0EEFF', text: '#3A5F5B' },
  es: { background: '#FFEDAE', text: '#6C5208' },
  pt: { background: '#E3E2D8', text: '#555451' },
  ar: { background: '#D7ECDF', text: '#3D5A4F' },
  de: { background: '#FFE5E5', text: '#A13453' },
  ru: { background: '#E4E7E4', text: '#3B4859' },
  zh: { background: '#EAD7EC', text: '#582C5D' },
  hi: { background: '#FFD890', text: '#754513' },
  fr: { background: '#D3E5C5', text: '#3A6E3A' },
};

export type LanguageCode = keyof typeof langColors;

interface LanguagesProps {
  langCodes: LanguageCode[];
}

export const Languages: FC<LanguagesProps> = ({ langCodes }) => {
  return (
    <Stack direction='row' flexWrap='wrap' gap='0.8rem'>
      {langCodes.map((langCode) => {
        const language = languages.find((lang) => lang.id === langCode);
        const color = langColors[langCode as keyof typeof langColors];
        return (
          <Chip
            key={langCode}
            label={language ? language.label : langCode}
            sx={{
              cursor: 'default',
              backgroundColor: color?.background,
              '& .MuiChip-label': {
                color: color?.text,
                fontWeight: 500,
              },
              '&:hover': {
                backgroundColor: color?.background
                  ? darken(color.background, 0.05)
                  : undefined,
              },
            }}
          />
        );
      })}
    </Stack>
  );
};
