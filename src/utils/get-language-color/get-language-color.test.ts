import { Theme } from '@mui/material';
import { getLanguageColor } from '.';

describe('getLanguageColor', () => {
  const mockTheme = {
    palette: {
      custom: {
        blue: '#0000FF',
        yellow: '#FFFF00',
        beige: '#F5F5DC',
        mint: '#98FF98',
        red: '#FF0000',
        gray: '#808080',
        lavender: '#E6E6FA',
        peach: '#FFDAB9',
        green: '#008000',
      },
    },
  } as unknown as Theme;

  it.each([
    ['en', 'blue', '#0000FF'],
    ['es', 'yellow', '#FFFF00'],
    ['pt', 'beige', '#F5F5DC'],
    ['ar', 'mint', '#98FF98'],
    ['de', 'red', '#FF0000'],
    ['ru', 'gray', '#808080'],
    ['zh', 'lavender', '#E6E6FA'],
    ['hi', 'peach', '#FFDAB9'],
    ['fr', 'green', '#008000'],
  ])(
    'should return the correct color for language code %s',
    (langCode, colorKey, expectedColor) => {
      const result = getLanguageColor(mockTheme, langCode as any);
      expect(result).toBe(expectedColor);
    }
  );

  it('should throw an error if an invalid language code is provided', () => {
    expect(() => getLanguageColor(mockTheme, 'invalid' as any)).toThrow();
  });
});
