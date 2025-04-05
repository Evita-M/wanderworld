const lightenRGB = (rgb: string, percent: number): string => {
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) return rgb;

  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);

  const lighten = (value: number) =>
    Math.min(255, value + (255 - value) * (percent / 100));

  return `rgb(${lighten(r)}, ${lighten(g)}, ${lighten(b)})`;
};

const darkenRGB = (rgb: string, percent: number): string => {
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) return rgb;

  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);

  const darken = (value: number) =>
    Math.max(0, value - value * (percent / 100));

  return `rgb(${darken(r)}, ${darken(g)}, ${darken(b)})`;
};

export { lightenRGB, darkenRGB };
