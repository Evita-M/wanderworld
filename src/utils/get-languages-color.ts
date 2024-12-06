import { Theme } from '@mui/material';

type LanguageCode =
  | 'en'
  | 'es'
  | 'pt'
  | 'ar'
  | 'de'
  | 'ru'
  | 'zh'
  | 'hi'
  | 'fr';

type ColorCode =
  | 'blue'
  | 'yellow'
  | 'beige'
  | 'mint'
  | 'red'
  | 'gray'
  | 'lavender'
  | 'peach'
  | 'green';

const languageToColorMap: Record<LanguageCode, ColorCode> = {
  en: 'blue',
  es: 'yellow',
  pt: 'beige',
  ar: 'mint',
  de: 'red',
  ru: 'gray',
  zh: 'lavender',
  hi: 'peach',
  fr: 'green',
};

export const getLanguageColor = (theme: Theme, langCode: LanguageCode) => {
  const colorKey = languageToColorMap[langCode];
  return theme.palette.custom[colorKey];
};
