import { darkenRGB, lightenRGB } from './utils';

const customPaletteColors = {
  green: 'rgb(20, 82, 66)',
  orange: 'rgb(204, 75, 36)',
  beige: 'rgb(238,234,231)',
  red: 'rgb(180, 53, 53)',
  lightGreen: 'rgb(21, 134, 44)',
  black: 'rgb(33, 36, 39)',
  offWhite: 'rgb(248, 237, 217)',
  white: 'rgb(255, 255, 255)',
};

export const palette = {
  primary: {
    main: customPaletteColors.green,
    light: lightenRGB(customPaletteColors.green, 30),
    dark: darkenRGB(customPaletteColors.green, 30),
    contrastText: customPaletteColors.white,
  },
  secondary: {
    main: customPaletteColors.orange,
    light: lightenRGB(customPaletteColors.orange, 30),
    dark: darkenRGB(customPaletteColors.orange, 30),
    contrastText: customPaletteColors.white,
  },
  tertiary: {
    main: customPaletteColors.beige,
    light: lightenRGB(customPaletteColors.beige, 30),
    dark: darkenRGB(customPaletteColors.beige, 40),
    darker: darkenRGB(customPaletteColors.beige, 60),
    contrastText: customPaletteColors.white,
  },
  quaternary: {
    main: customPaletteColors.black,
    light: lightenRGB(customPaletteColors.black, 30),
    dark: darkenRGB(customPaletteColors.black, 40),
    darker: darkenRGB(customPaletteColors.black, 60),
    contrastText: customPaletteColors.white,
  },
  error: {
    main: customPaletteColors.red,
    light: lightenRGB(customPaletteColors.red, 30),
    dark: darkenRGB(customPaletteColors.red, 30),
    contrastText: customPaletteColors.white,
  },
  success: {
    main: customPaletteColors.lightGreen,
    light: lightenRGB(customPaletteColors.lightGreen, 30),
    dark: darkenRGB(customPaletteColors.lightGreen, 30),
    contrastText: customPaletteColors.white,
  },
  text: {
    body: customPaletteColors.black,
    caption: customPaletteColors.black,
    disabled: customPaletteColors.black,
  },
};

export const customColors = {
  blue: {
    main: 'rgb(209, 240, 255)',
    light: lightenRGB('rgb(209, 240, 255)', 30),
    dark: darkenRGB('rgb(209, 240, 255)', 30),
    text: 'rgb(58, 95, 91)',
  },
  yellow: {
    main: 'rgb(255, 237, 174)',
    light: lightenRGB('rgb(255, 237, 174)', 30),
    dark: darkenRGB('rgb(255, 237, 174)', 30),
    text: 'rgb(108, 82, 8)',
  },
  beige: {
    main: 'rgb(227, 226, 216)',
    light: lightenRGB('rgb(227, 226, 216)', 30),
    dark: darkenRGB('rgb(227, 226, 216)', 30),
    text: 'rgb(85, 84, 81)',
  },
  mint: {
    main: 'rgb(215, 236, 223)',
    light: lightenRGB('rgb(215, 236, 223)', 30),
    dark: darkenRGB('rgb(215, 236, 223)', 30),
    text: 'rgb(61, 90, 79)',
  },
  red: {
    main: 'rgb(255, 229, 229)',
    light: lightenRGB('rgb(255, 229, 229)', 30),
    dark: darkenRGB('rgb(255, 229, 229)', 30),
    text: 'rgb(161, 52, 83)',
  },
  gray: {
    main: 'rgb(228, 231, 228)',
    light: lightenRGB('rgb(228, 231, 228)', 30),
    dark: darkenRGB('rgb(228, 231, 228)', 30),
    text: 'rgb(59, 72, 89)',
  },
  lavender: {
    main: 'rgb(234, 215, 236)',
    light: lightenRGB('rgb(234, 215, 236)', 30),
    dark: darkenRGB('rgb(234, 215, 236)', 30),
    text: 'rgb(88, 44, 93)',
  },
  peach: {
    main: 'rgb(255, 216, 144)',
    light: lightenRGB('rgb(255, 216, 144)', 30),
    dark: darkenRGB('rgb(255, 216, 144)', 30),
    text: 'rgb(117, 69, 19)',
  },
  green: {
    main: 'rgb(211, 229, 197)',
    light: lightenRGB('rgb(211, 229, 197)', 30),
    dark: darkenRGB('rgb(211, 229, 197)', 30),
    text: 'rgb(58, 110, 58)',
  },
};
