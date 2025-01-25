'use client';
import { createTheme } from '@mui/material/styles';
import { green, grey } from '@mui/material/colors';
import { typography } from './typography';
import { palette, customColors, bgColor } from './colors';
import { borderRadius } from './border-radius';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    custom: Record<string, { main: string; text: string }>;
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    custom?: Record<string, { main: string; text: string }>;
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

const theme = createTheme({
  palette: {
    background: {
      default: bgColor,
    },
    primary: palette.primary,
    secondary: palette.secondary,
    tertiary: palette.tertiary,
    error: palette.error,
    warning: palette.warning,
    info: palette.info,
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
    h6: {
      fontFamily: `var(--museo-moderno), cursive`,
      fontSize: typography.h6,
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
      fontSize: typography.bodySmall,
      lineHeight: typography.lineHeightBody,
      fontWeight: 400,
    },
    // Supporting text
    caption: {
      fontSize: typography.caption,
      lineHeight: typography.lineHeightSmall,
      fontWeight: 500,
      color: grey[700],
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
      fontSize: typography.bodySmall,
      fontWeight: 500,
      textTransform: 'none',
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
          background: palette.primary.lighter,
          animation: 'none',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: 'none', // Remove the default underline
          paddingBottom: 0, // Remove extra space under the tabs
        },
        indicator: {
          display: 'none',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: `var(--museo-moderno), cursive`,
          fontSize: '1.8rem',
          textTransform: 'none',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)', // Vertical separator between items
          borderBottom: 'none',
          padding: '0 2.4rem',
          minHeight: '4rem',
          '&:last-of-type': {
            borderRight: 'none',
            paddingRight: '0',
          },
          '&:first-of-type': {
            paddingLeft: '0',
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
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.small,
          textTransform: 'none',
          fontWeight: 500,
          lineHeight: 1.5,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: 'rgba(33, 158, 188, 0.95)',
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: 'rgba(251, 133, 0, 0.95)',
          },
        },
        containedError: {
          '&:hover': {
            backgroundColor: 'rgba(199, 0, 57, 0.95)',
          },
        },
        sizeSmall: {
          padding: '0.6rem 1.6rem',
          fontSize: '1.4rem',
          height: '3.2rem',
          minWidth: '8rem',
        },
        sizeMedium: {
          padding: '0.8rem 2.4rem',
          fontSize: '1.6rem',
          height: '4rem',
          minWidth: '10rem',
        },
        sizeLarge: {
          padding: '1.2rem 3.2rem',
          fontSize: '1.8rem',
          height: '4.8rem',
          minWidth: '12rem',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: palette.primary.main,
          color: '#fff',
          height: '34px',
          '&:hover': {
            backgroundColor: palette.primary.dark,
          },
          '&.MuiChip-deletable:hover': {
            backgroundColor: palette.primary.dark,
          },
        },
        label: {
          fontWeight: 500,
        },
        deleteIcon: {
          color: '#fff',
          '&:hover': {
            color: '#fff',
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
          minWidth: '20rem',
          '&:hover': {
            backgroundColor: bgColor,
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: borderRadius.medium,
          boxShadow: 'none',
          border: `1px solid ${grey[300]}`,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: palette.primary.light,
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
            borderColor: palette.primary.light,
          },
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
            color: palette.primary.dark,
          },
        },
        track: {
          color: palette.primary.light,
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
          color: palette.primary.light,
          '&.Mui-checked': {
            color: palette.primary.main,
          },
          '&:hover': {
            color: palette.primary.dark,
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
            backgroundColor: palette.primary.light,
            opacity: 1,
          },
        },
        thumb: {
          color: palette.primary.main,
          '&:hover': {
            color: palette.primary.dark,
          },
        },
        track: {
          backgroundColor: grey[600],
          height: '12px',
          '&.Mui-checked': {
            backgroundColor: palette.primary.light,
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
    MuiToggleButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderColor: palette.primary.light,
          '&.Mui-selected': {
            backgroundColor: palette.primary.main,
            color: '#fff',
            '&:hover': {
              backgroundColor: palette.primary.dark,
            },
          },
          '&:hover': {
            backgroundColor: palette.primary.lighter,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderColor: palette.primary.light,
          '&.Mui-focused': {
            borderColor: palette.primary.main,
          },
        },
        icon: {
          color: palette.primary.main,
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
            color: palette.primary.dark,
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
