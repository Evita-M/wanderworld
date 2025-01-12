import { createTheme, darken } from '@mui/material';
import { getRandomColor } from '.';

describe('getRandomColor', () => {
  const mockTheme = createTheme({
    palette: {
      custom: {
        red: { main: '#ff0000', text: '#ffffff' },
        green: { main: '#00ff00', text: '#000000' },
        blue: { main: '#0000ff', text: '#ffffff' },
      },
    },
  });

  it('should return the correct color based on the index', () => {
    expect(getRandomColor(mockTheme, 0)).toBe('#ff0000');
    expect(getRandomColor(mockTheme, 1)).toBe('#00ff00');
    expect(getRandomColor(mockTheme, 2)).toBe('#0000ff');
  });

  it('should handle index wrapping around', () => {
    expect(getRandomColor(mockTheme, 3)).toBe('#ff0000');
  });
});
