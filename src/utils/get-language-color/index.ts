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

const languageColorMap: Record<LanguageCode, keyof Theme['palette']['custom']> =
  {
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

export function getLanguageColor(
  theme: Theme,
  languageCode: LanguageCode
): string {
  if (!(languageCode in languageColorMap)) {
    throw new Error(`Unsupported language code: ${languageCode}`);
  }

  const colorKey = languageColorMap[languageCode];
  const color = theme.palette.custom[colorKey];
  return typeof color === 'string' ? color : color.main;
}
