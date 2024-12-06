import { Theme, darken } from '@mui/material';

export const getRandomColor = (
  theme: Theme,
  index: number,
  darkenBy?: number
) => {
  const colors = Object.values(theme.palette.custom);
  const baseColor = colors[index % colors.length].bg;
  return darkenBy ? darken(baseColor, darkenBy) : baseColor;
};
