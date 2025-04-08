'use client';
import { createTheme } from '@mui/material/styles';
import { green, grey } from '@mui/material/colors';
import { typography } from './typography';
import { palette, customColors } from './colors';
import { borderRadius } from './border-radius';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    quaternary: Palette['primary'];
    custom: Record<string, { main: string; text: string }>;
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    quaternary?: PaletteOptions['primary'];
    custom?: Record<string, { main: string; text: string }>;
  }

  interface PaletteColor {
    darker?: string;
  }

  interface Theme {
    borderRadius: {
      small: string;
      medium: string;
      large: string;
    };
  }
  interface ThemeOptions {
    borderRadius?: {
      small: string;
      medium: string;
      large: string;
    };
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    'contained-tertiary': true;
  }
  interface ButtonPropsColorOverrides {
    quaternary: true;
    tertiary: true;
  }
}

const theme = createTheme({
  palette: {
    ...palette,
    background: {
      default: '#F2F0EF',
    },
    text: {
      ...palette.text,
      secondary: palette.tertiary.dark,
    },
    custom: customColors,
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: `var(--noto-sans), sans-serif`,
    allVariants: {
      color: grey[900],
      letterSpacing: '0.025em',
    },

    h1: {
      fontFamily: `var(--museo-moderno), cursive`,
      fontSize: typography.h1,
      lineHeight: typography.lineHeightHeading,
      fontWeight: 500,
    },
    h2: {
      fontFamily: `var(--museo-moderno), cursive`,
      fontSize: typography.h2,
      lineHeight: typography.lineHeightHeading,
      fontWeight: 500,
    },
    h3: {
      fontFamily: `var(--museo-moderno), cursive`,
      fontSize: typography.h3,
      lineHeight: typography.lineHeightHeading,
      fontWeight: 500,
    },
    h4: {
      fontFamily: `var(--museo-moderno), cursive`,
      fontSize: typography.h4,
      lineHeight: typography.lineHeightHeading,
      fontWeight: 500,
    },
    h5: {
      fontFamily: `var(--museo-moderno), cursive`,
      fontSize: typography.h5,
      lineHeight: typography.lineHeightHeading,
      fontWeight: 500,
    },
    // Body text
    body1: {
      fontSize: typography.bodyMain,
      lineHeight: typography.lineHeightBody,
      fontWeight: 400,
    },
    body2: {
      fontSize: typography.bodyMain,
      color: palette.tertiary.darker,
      lineHeight: typography.lineHeightBody,
      fontWeight: 400,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    // Supporting text
    caption: {
      fontSize: typography.caption,
      lineHeight: typography.lineHeightSmall,
      fontWeight: 500,
      color: palette.tertiary.dark,
      textTransform: 'uppercase',
    },
    overline: {
      fontSize: typography.tiny,
      lineHeight: typography.lineHeightSmall,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    // Button text
    button: {
      fontSize: typography.bodyMain,
      textTransform: 'none',
      letterSpacing: '0.05em',
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          padding: '4px',
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          background: palette.primary.main,
          animation: 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: '1.2rem',
          minWidth: '16rem',
          fontWeight: 500,
          lineHeight: 1.5,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          padding: '8px 16px',
          letterSpacing: '0.05em',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0)',
          '&.Mui-disabled': {
            backgroundColor: palette.tertiary.light,
            color: palette.tertiary.dark,
            opacity: 0.7,
          },
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
          },
          '&.MuiButton-containedQuaternary': {
            backgroundColor: palette.quaternary.main,
            color: palette.quaternary.contrastText,
            '&:hover': {
              backgroundColor: palette.quaternary.dark,
            },
            '&.Mui-disabled': {
              backgroundColor: palette.tertiary.light,
              boxShadow: 'none',
              color: palette.primary.contrastText,
            },
          },
          '&.MuiButton-outlinedQuaternary': {
            borderColor: palette.quaternary.main,
            color: palette.quaternary.main,
            '&:hover': {
              borderColor: palette.quaternary.dark,
              color: palette.primary.contrastText,
            },
          },
        },
        sizeLarge: {
          height: '4.8rem',
          padding: '1.2rem 2.4rem',
        },
        sizeMedium: {
          height: '4rem',
          padding: '0.8rem 2.4rem',
        },
        sizeSmall: {
          height: '3.2rem',
          padding: '0.6rem 1.2rem',
        },
        outlined: {
          '&:hover': {
            backgroundColor: 'rgb(255, 255, 255)',
          },
        },
        containedPrimary: {
          backgroundColor: palette.primary.main,
          color: palette.primary.contrastText,
          '&:hover': {
            backgroundColor: palette.primary.dark,
          },
          '&.Mui-disabled': {
            backgroundColor: palette.primary.light,
            boxShadow: 'none',
            color: palette.primary.contrastText,
          },
        },
        containedSecondary: {
          backgroundColor: palette.secondary.main,
          color: palette.secondary.contrastText,
          '&:hover': {
            backgroundColor: palette.secondary.dark,
          },
          '&.Mui-disabled': {
            backgroundColor: palette.secondary.light,
            boxShadow: 'none',
            color: palette.secondary.contrastText,
          },
        },
        containedError: {
          backgroundColor: palette.error.main,
          color: palette.error.contrastText,
          '&:hover': {
            backgroundColor: palette.error.dark,
          },
          '&.Mui-disabled': {
            backgroundColor: palette.error.light,
            boxShadow: 'none',
            color: palette.error.contrastText,
          },
        },
        text: {
          backgroundColor: 'rgb(255, 255, 255)',
          border: 'none',
          '&:hover': {
            backgroundColor: 'rgb(255, 255, 255)',
          },
          '&.MuiButton-textError': {
            color: palette.error.main,
            '&:hover': {
              color: palette.error.dark,
            },
            '&.Mui-disabled': {
              boxShadow: 'none',
              color: palette.error.light,
              backgroundColor: 'rgb(255, 255, 255, 0.9)',
            },
          },
          '&.MuiButton-textTertiary': {
            color: palette.text.caption,
            '&:hover': {
              color: palette.text.body,
            },
            '&.Mui-disabled': {
              boxShadow: 'none',
              color: palette.text.caption,
              backgroundColor: 'rgb(255, 255, 255, 0.9)',
            },
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          display: 'none',
        },
      },
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          padding: '0.8rem 1.6rem',
          color: palette.tertiary.dark,
          textTransform: 'none',
          position: 'relative',
          zIndex: 2,
          '&:hover': {
            color: palette.tertiary.darker,
          },
          '&.Mui-selected': {
            color: palette.tertiary.darker,
            fontWeight: 600,
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#023047',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          letterSpacing: '0.05em',
          border: 'none',
          padding: '0.4rem 0.8rem',
          borderRadius: '2rem',
          fontSize: '1.4rem',
          '&.MuiChip-sizeMedium': {
            height: '3.6rem',
          },
          '&.MuiChip-sizeSmall': {
            height: '3.2rem',
            padding: '0.2rem 0.8rem',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#0C7C59',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '1.6rem',
          padding: '0.8rem 1.2rem',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            backgroundColor: palette.tertiary.light,
          },
          '&.Mui-selected': {
            backgroundColor: palette.tertiary.light,
            '&:hover': {
              backgroundColor: palette.tertiary.main,
            },
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          marginTop: '0.4rem',
          borderRadius: borderRadius.small,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          border: 'none',
          backgroundColor: '#fff',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: palette.primary.main,
          opacity: 0.5,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.primary.main,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.primary,
          },
        },
        notchedOutline: {
          border: 'none',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: grey[700],
          fontWeight: 500,
          textTransform: 'uppercase',
          '&.Mui-focused': {
            color: grey[700],
          },
          '&.Mui-error': {
            textTransform: 'none',
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        thumb: {
          color: palette.primary.main,
          height: '24px',
          width: '24px',
          '&:hover': {
            color: palette.primary,
          },
        },
        track: {
          color: palette.primary.main,
          height: '12px',
        },
        rail: {
          color: grey[300],
          height: '12px',
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: green[500],
          '&.Mui-checked': {
            color: green[600],
          },
          '&:hover': {
            backgroundColor: green[100],
          },
          '&.Mui-checked:hover': {
            color: green[700],
          },
        },
      },
    },
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          backgroundColor: '#fff',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: palette.primary.main,
          '&.Mui-checked': {
            color: palette.primary.main,
          },
          '&:hover': {
            color: palette.primary.main,
            backgroundColor: 'transparent',
          },
          '&.Mui-checked:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: '64px',
        },
        switchBase: {
          '&.Mui-checked': {
            transform: 'translateX(28px)',
            color: palette.primary.main,
          },
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: palette.primary.main,
            opacity: 1,
          },
        },
        thumb: {
          color: palette.primary.main,
          '&:hover': {
            color: palette.primary.main,
          },
        },
        track: {
          backgroundColor: grey[600],
          height: '12px',
          '&.Mui-checked': {
            backgroundColor: palette.primary.main,
            opacity: 1,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiFormHelperText-root.Mui-error': {
            position: 'absolute',
            top: '100%',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          cursor: 'pointer',
          minWidth: '16rem',
          borderRadius: '0.8rem',
          '&.Mui-focused': {
            borderColor: 'transparent',
          },
          '&.Mui-selected:hover': {
            backgroundColor: palette.tertiary.main,
          },
        },
        select: {
          padding: '0.8rem 2.4rem 0.8rem 2.4rem',
          fontSize: '1.6rem',
          borderRadius: '0.8rem',
          border: 'none',
          backgroundColor: 'white',
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'white',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
          },
          '&:focus': {
            backgroundColor: 'white',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
          },
          '.MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        },
        icon: {
          color: palette.text.caption,
          right: '1.2rem',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: '4px 0',
          display: 'flex',
          alignItems: 'center',
          '&.with-bullet::before': {
            content: '""',
            display: 'block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            marginRight: '12px',
          },
          '&.bullet-blue::before': {
            backgroundColor: customColors.blue.main,
          },
          '&.bullet-yellow::before': {
            backgroundColor: customColors.yellow.main,
          },
          '&.bullet-beige::before': {
            backgroundColor: customColors.beige.main,
          },
          '&.bullet-mint::before': {
            backgroundColor: customColors.mint.main,
          },
          '&.bullet-red::before': {
            backgroundColor: customColors.red.main,
          },
          '&.bullet-gray::before': {
            backgroundColor: customColors.gray.main,
          },
          '&.bullet-lavender::before': {
            backgroundColor: customColors.lavender.main,
          },
          '&.bullet-peach::before': {
            backgroundColor: customColors.peach.main,
          },
          '&.bullet-green::before': {
            backgroundColor: customColors.green.main,
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          marginRight: 0,
          '&:hover .MuiCheckbox-root': {
            color: palette.primary,
            transition: 'color 0.3s ease',
          },
        },
        label: {
          fontSize: '1.6rem',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
  borderRadius,
});

export default theme;
